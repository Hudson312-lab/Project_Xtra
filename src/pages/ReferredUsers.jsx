import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { isMobile } from 'react-device-detect';

function ReferredUsers() {
  const [loading, setLoading] = useState(true);
  const [referredUsers, setReferredUsers] = useState([]);
  const [netAffiliateIncome, setNetAffiliateIncome] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const id = user.uid;

        try {
          // Fetch referred users
          const q = query(collection(db, "profiles"), where("referralUid", "==", id));
          const querySnapshot = await getDocs(q);
          const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setReferredUsers(users);

          // Calculate net affiliate income
          const totalInvestment = users.reduce((sum, user) => sum + (user.investment || 0), 0);
          const affiliateIncome = totalInvestment * 0.1;
          setNetAffiliateIncome(affiliateIncome);
        } catch (error) {
          console.error("Error fetching referred users:", error);
        }
      } else {
        navigate('/'); // Redirect to home page if not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        <p className="text-gray-600 font-bold text-xl text-center">
          Please switch to a mobile device for the best experience.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className='ml-2 mt-2 font-bold'>Loading referred users...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="font-extrabold text-3xl mt-4 mb-6">Referred Users</h2>
      {referredUsers.length === 0 ? (
        <p>No data to display.</p>
      ) : (
        <>
          <ul className="w-full max-w-lg">
            {referredUsers.map(user => (
              <li key={user.id} className="mb-2 p-4 bg-gray-200 rounded shadow-md">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Investment:</strong> ${user.investment}</p>
                <p><strong>Affiliate Income (10%):</strong> ${user.investment * 0.1}</p>
                <p><strong>UID:</strong> {user.uid}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 bg-green-200 rounded shadow-md">
            <p className="font-bold"><strong>Net Affiliate Income:</strong> ${netAffiliateIncome}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ReferredUsers;

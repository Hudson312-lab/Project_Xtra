import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

function ReferredUsers() {
  const [loading, setLoading] = useState(true);
  const [referredUsers, setReferredUsers] = useState([]);
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

  if (loading) {
    return <div className='ml-2 mt-2 font-bold'>Loading referred users...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="font-extrabold text-3xl mt-4 mb-6">Referred Users</h2>
      {referredUsers.length === 0 ? (
        <p>No users referred yet.</p>
      ) : (
        <ul className="w-full max-w-lg">
          {referredUsers.map(user => (
            <li key={user.id} className="mb-2 p-4 bg-gray-200 rounded shadow-md">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Investment</strong> {user.investment}</p>
              <p><strong> UID:</strong> {user.uid}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReferredUsers;

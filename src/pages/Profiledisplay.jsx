import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { FaCheckCircle, FaMoneyBillWave, FaChartLine, FaDollarSign, FaPiggyBank } from 'react-icons/fa';
import { auth, db, storage } from '../firebase';
import { isMobile } from 'react-device-detect';

const UserProfileDisplay = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const id = user.uid;

        try {
          const docRef = doc(db, 'profiles', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
            const pictureRef = ref(storage, `profilePictures/${id}`);
            const pictureUrl = await getDownloadURL(pictureRef);
            setProfilePicture(pictureUrl);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // Navigate to home or login if not authenticated
        // useNavigate() should be used here if needed
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 font-bold text-xl">
          Please switch to a mobile device for the best experience.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div>Showing Profile...</div>;
  }

  return (
    <div className="min-h-screen bg-indigo-200 p-4 flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col space-y-4">
        <div className="bg-gradient-to-b from-indigo-800 to-indigo-600 shadow-lg rounded-lg overflow-hidden p-4 flex flex-col items-center space-y-4">
          <h2 className="text-3xl text-center font-bold bg-indigo-600 w-full p-2 rounded text-white">{profileData.username}</h2>
          <div className="w-full flex items-center ml-14">
            <div className="flex items-center space-x-4">
              <img
                className="w-24 h-24 rounded-full border-4 border-white shadow-md mr-4"
                src={profilePicture}
                alt="Profile"
              />
              <div className="flex flex-col justify-center items-center sm:items-start">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-white">Status:</h3>
                    <p className="text-lg font-bold text-green-400">Active</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-white">Level:</h3>
                    <p className="text-lg font-bold text-yellow-400">{profileData.level}</p>
                  </div>
                  <p className="text-base text-white flex items-center mt-2">
                    <FaCheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    Verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="w-full grid font-bold grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: FaMoneyBillWave, title: "Investment", value: `$${profileData.investment}`, color: "text-yellow-600", bgColor: "bg-gray-100" },
            { icon: FaChartLine, title: "ROI", value: `$${profileData.roi}`, color: "text-green-500", bgColor: "bg-gray-50" },
            { icon: FaDollarSign, title: "Affiliate Earnings", value: `$${profileData.affiliateEarnings}`, color: "text-purple-600", bgColor: "bg-gray-100" },
            { icon: FaDollarSign, title: "Total Income", value: `$${profileData.totalEarnings}`, color: "text-blue-600", bgColor: "bg-gray-100" },
            { icon: FaPiggyBank, title: "Withdrawals", value: `$${profileData.withdrawals}`, color: "text-pink-600", bgColor: "bg-gray-100" },
          ].map((item, index) => (
            <div key={index} className={`shadow-lg rounded-lg overflow-hidden p-4 flex items-center ${item.bgColor}`}>
              <item.icon className={`w-8 h-8 mr-4 ${item.color}`} />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* UID Display */}
        <div className="w-full mt-8 text-center">
          <h3 className="text-lg font-semibold text-white bg-indigo-500 p-2 rounded">UID:</h3>
          <p className="text-lg font-bold text-red-500 mt-3">
            {profileData.uid}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDisplay;

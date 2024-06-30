import React, { useEffect, useState } from 'react';
import { FaCopy, FaCheckCircle } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import addressQR from "../assets/address.jpeg";

const ActivateAccount = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [userInfo, setUserInfo] = useState({ uid: '', email: '' });
  const navigate = useNavigate();
  const auth = getAuth();
  const firestore = getFirestore();

  const address = "TTsencRWSr3qioVVjb6BPQ4ACLGvgUuTqk";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({ uid: user.uid, email: user.email });
        checkActivationStatus(user.uid);
      } else {
        // Handle the case when the user is not authenticated
        setUserInfo({ uid: '', email: '' });
        navigate('/login'); // Redirect to login if needed
      }
    });

    return () => unsubscribe();
  }, [auth, firestore, navigate]);

  const checkActivationStatus = async (uid) => {
    const docRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.isActivated) {
        navigate('/profile'); // Redirect to profile page
      } else {
        setTimeout(() => checkActivationStatus(uid), 5000); // Check again after 5 seconds
      }
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    alert('Address copied to clipboard!');
  };

  const handleActivationSubmit = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(firestore, 'users', user.uid);
      await setDoc(docRef, {
        email: user.email,
        isActivated: false,
      });
      alert('Your payment details have been submitted. Please wait for activation.');
    }
  };

  // if (!isMobile) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p className="text-gray-600 font-bold text-xl">
  //         Please switch to a mobile device for the best experience.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-lg min-h-screen mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="mb-6 p-2 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-bold text-indigo-700">UID & Email</h3>
        <p className="text-gray-700"> {userInfo.uid}</p>
        <p className="text-gray-700">{userInfo.email}</p>
      </div>
      <h2 className="text-2xl font-extrabold mb-6 text-indigo-700 flex items-center">
        <FaCheckCircle className="mr-2" /> Activate your account
      </h2>
      <p className="text-gray-700 mb-4 font-bold text-xl">
        Deposit <strong>10 USDT</strong> from your <strong>Binance</strong> to this address using <strong>TRC20</strong> for account activation.
      </p>
      <label className="block font-bold mb-2 text-indigo-700">TRC20 Address:</label>
      <div className="mb-4">
        <img src={addressQR} alt="Address QR Code" className="w-full rounded-lg shadow-md" />
      </div>
      <div className="mb-4">
        <div className="relative">
          <textarea
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
            value={address}
            onFocus={(e) => e.target.select()}
          />
          <button
            onClick={handleCopyAddress}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-indigo-700"
          >
            <FaCopy />
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-indigo-700 font-bold mb-2">Submit your Payment TRXID and Screenshot to:</label>
        <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-indigo-600 flex items-center font-bold text-lg">
          alphainvestmentsone@hotmail.com
        </p>
      </div>
      <button
        onClick={handleActivationSubmit}
        className="w-full p-3 bg-indigo-700 text-white rounded-lg font-bold mt-4"
      >
        I have made the payment
      </button>
      <p className="text-gray-700 mt-6 font-normal">
        Your profile will be activated within 24 hours. In case of any issues, feel free to email us. We are here to serve you 24/7.
      </p>
    </div>
  );
};

export default ActivateAccount;

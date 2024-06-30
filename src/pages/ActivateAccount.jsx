import React, { useEffect, useState } from 'react';
import { FaCopy, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import addressQR from "../assets/address.jpeg";
import { isMobile } from 'react-device-detect';

const ActivateAccount = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ uid: '', email: '' });
  const navigate = useNavigate();
  const auth = getAuth();
  const firestore = getFirestore();

  const address = "TTsencRWSr3qioVVjb6BPQ4ACLGvgUuTqk";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserInfo({ uid: user.uid, email: user.email });
        const isActivated = await checkActivationStatus(user.uid);
        if (isActivated) {
          navigate('/profile'); // Redirect to profile page
        } else {
          setIsLoading(false);
        }
      } else {
        setUserInfo({ uid: '', email: '' });
        navigate('/'); // Redirect to home page if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, firestore, navigate]);

  const checkActivationStatus = async (uid) => {
    const docRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.isActivated;
    }
    return false;
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
        uid: user.uid,
        email: user.email,
        isActivated: false,
      });
      alert('Your payment details have been submitted. Please wait for activation.');
    }
  };

  if (!isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 font-bold text-xl">
          Please switch to a mobile device for the best experience.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <div className='ml-2 mt-2 font-bold'>Checking Activation Status...</div>;
  }

  return (
    <div className="max-w-lg min-h-screen mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold text-indigo-700">User Information : UID & Email</h3>
        <p className="text-gray-700"> {userInfo.uid}</p>
        <p className="text-gray-700">{userInfo.email}</p>
      </div>
      <h2 className="text-2xl font-extrabold mb-4 text-indigo-700 flex items-center">
        <FaCheckCircle className="mr-2" /> Activate your account
      </h2>
      <h3 className="text-xl font-extrabold mb-4 text-gray-900 flex border-b-2 border-indigo-700 pb-2">Follow these 3 steps to activate your account:</h3>
      <p className="text-gray-700 mb-4 font-medium text-lg">
        <span className="font-bold"> <span>Step 1: </span></span> Deposit <strong>10 USDT</strong> from your <strong>Binance</strong> to this address using <strong>TRC20</strong> for account activation.
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
        <label className="block font-bold mb-2 text-lg">Step 2: After payment, submit your Payment TRXID and Screenshot to:</label>
        <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-indigo-600 flex items-center font-bold text-lg">
          alphainvestmentsone@hotmail.com
        </p>
      </div>
      <p className="font-bold text-lg">Step 3: After completing the payment and emailing, please click this button:</p>
      <button
        onClick={handleActivationSubmit}
        className="w-full p-3 bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 text-white rounded-lg font-bold mt-4 transition-colors duration-300"
      >
        I have completed process
      </button>
      <p className="text-gray-700 mt-6 font-medium text-lg">
        Your profile will be activated within 24 hours. In case of any issues, feel free to email us. We are here to serve you 24/7.
      </p>
    </div>
  );
};

export default ActivateAccount;

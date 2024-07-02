import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { isMobile } from 'react-device-detect';

const InstallBinancePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ uid: '', email: '' });
  const navigate = useNavigate();
  const auth = getAuth();
  const firestore = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserInfo({ uid: user.uid, email: user.email });
        const isActivated = await checkActivationStatus(user.uid);
        if (isActivated) {
          navigate('/activate'); // Redirect to activate page
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

  const handleNextPage = () => {
    navigate('/activate');
  };

  if (!isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        <p className="text-gray-600 font-bold text-xl text-center">
          Please switch to a mobile device for the best experience.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='ml-2 mt-2 font-bold'>Checking Binance Membership...</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-2 bg-gray-100 overflow-hidden">
      <h1 className="text-3xl mt-2 font-extrabold mb-6 text-yellow-700 text-center leading-snug border-2 rounded-md p-2 ">
        Install, Get Registered, and Start Using BINANCE
        <span className="block mt-2 text-2xl text-yellow-600">This investment and earning opportunity is for BINANCE users only !</span>
      </h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <a 
          href="https://play.google.com/store/apps/details?id=com.binance.dev&hl=en&pli=1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 underline text-center"
        >
          Install from Google Play Store
        </a>
        <a 
          href="https://apps.apple.com/ae/app/binance-buy-bitcoin-crypto/id1436799971" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 underline text-center"
        >
          Install from Apple App Store
        </a>
      </div>
      <p className="text-lg mb-4 font-bold text-center">
        You must be a verified BINANCE user and should understand its following core operations
      </p>
      <ul className="list-disc list-inside mb-4 text-center">
        <li>Binance account registration & verification</li>
        <li>Binanace account ID and TRC20 Address </li>
        <li>Buying and Sending USDT</li>
        <li>Receiving and Selling USDT</li>
        <li>Basic Binance Operations</li>
      </ul>
      <button
        onClick={handleNextPage}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300 mt-4"
      >
        Click here, if you are a verified BINANCE user and understand its basic operations
      </button>
    </div>
  );
};

export default InstallBinancePage;

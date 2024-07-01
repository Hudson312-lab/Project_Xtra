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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 font-bold text-xl">
          Please switch to a mobile device for the best experience.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="ml-2 mt-2 font-bold">Checking Activation Status...</div>;
  }

  return (
    <div className="flex flex-col items-center p-10 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">Install Binance</h1>
      <div className="flex space-x-4 mb-6">
        <a 
          href="https://play.google.com/store/apps/details?id=com.binance.dev&hl=en&pli=1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Install from Google Play Store
        </a>
        <a 
          href="https://apps.apple.com/ae/app/binance-buy-bitcoin-crypto/id1436799971" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Install from Apple App Store
        </a>
      </div>
      <p className="text-lg mb-4 font-bold">
        You must be a verified Binance user and should understand its core operations 
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Binance account registration & verification</li>
        <li>Buying and Sending USDT</li>
        <li>Receiving and Selling USDT</li>
        <li>Basic Binance management</li>
      </ul>
      <button
        onClick={handleNextPage}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300 mt-4"
      >
        Click if you are a verified Binance user and understand its basic operations
      </button>
    </div>
  );
};

export default InstallBinancePage;

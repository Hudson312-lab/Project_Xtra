import { useNavigate } from 'react-router-dom';

const InstallBinancePage = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate('/activate');
  };

  return (
    <div className="flex flex-col items-center p-10 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">Binanace</h1>
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
      <p className="text-lg font-semibold mb-4">
        You must be a verified Binance user and should understand its core operations
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Buy and Sell USDT</li>
        <li>Send and Receive USDT</li>
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

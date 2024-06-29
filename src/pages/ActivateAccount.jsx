import { FaCopy, FaCheckCircle } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import { useEffect } from 'react';

const ActivateAccount = () => {
  const address = "TTsencRWSr3qioVVjb6BPQ4ACLGvgUuTqk";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    alert('Address copied to clipboard!');
  };

  useEffect(() => {
    // Disable scrolling on component mount
    document.body.style.overflow = 'hidden';

    // Enable scrolling on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
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

  return (
    <div className="max-w-lg min-h-screen mx-auto p-8  bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-extrabold mb-6 text-indigo-700 flex items-center">
        <FaCheckCircle className="mr-2" /> Activate your account
      </h2>
      <p className="text-gray-700 mb-4 font-medium">
        Deposit <strong>10 USDT</strong> from your <strong>Binance</strong> to this address using  <strong>TRC20</strong> for account activation.
      </p>
      <div className="mb-4">
        <label className="block font-bold mb-2 text-indigo-700">TRC20 Address:</label>
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
            <FaCopy className='mt-6 h-12' />
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-indigo-700 font-bold mb-2">Submit your Payment TRXID and Screenshot to:</label>
        <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-indigo-600 flex items-center font-bold text-lg">
          
             alphainvestmentsone@hotmail.com

        </p>
      </div>
      <p className="text-gray-700 mt-6 font-normal">
        Your profile will be activated within 24 hours, in case of any issue, feel free to mail us. We are here to serve you 24/7.
      </p>
    </div>
  );
};

export default ActivateAccount;

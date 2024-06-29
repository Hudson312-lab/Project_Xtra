
import Barcode from 'react-barcode';

const ActivateAccount = () => {
  // Placeholder Binance BEP20 address
  const address = "bnb1u7tcrsffj4y7v3ysh4rvsz5q6hxjsgfhvllhxz";

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Activate your account</h2>
      <p className="text-gray-700 mb-4">
        Deposit $10 from your Binance to this address using Binance BEP20 for account activation.
      </p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Address via direct:</label>
        <textarea
          readOnly
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
          value={address}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Address via barcode:</label>
        <div className="flex justify-center">
          <Barcode value={address} />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Submit your TRXID and Screenshot:</label>
        <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
          Send your TRXID and Screenshot to <a href="mailto:alphainvestmentone@hotmail.com" className="text-indigo-600">alphainvestmentone@hotmail.com</a>
        </p>
      </div>
      <p className="text-gray-700">
        Your profile will be activated within 24 hours.
      </p>
    </div>
  );
};

export default ActivateAccount;

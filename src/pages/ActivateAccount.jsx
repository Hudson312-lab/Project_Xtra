

const ActivateAccount = () => {
  const address = "bnb1u7tcrsffj4y7v3ysh4rvsz5q6hxjsgfhvllhxz";

  return (
    <div className="max-w-lg min-h-screen mx-auto p-8 bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-2xl mb-6 text-indigo-700">Activate your account</h2>
      <p className="text-gray-700 mb-4 font-medium">
        Deposit $10 from your Binance to this address using Binance BEP20 for account activation.
      </p>
      <div className="mb-4">
        <label className="block  font-bold mb-2 text-indigo-700"> Binance BEP20 Address :</label>
        <textarea
          readOnly
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
          value={address}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div className="mb-4">
        <label className="block text-indigo-700 font-bold mb-2">Submit your TRXID and Screenshot:</label>
        <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100">
          Send your TRXID and Screenshot to{' '}
          <a href="mailto:alphainvestmentone@hotmail.com" className="text-indigo-600 underline">
            alphainvestmentone@hotmail.com
          </a>
        </p>
      </div>
      <p className="text-gray-700 mt-6 font-normal">
        Your profile will be activated within 24 hours, in case of any issue, feel free to mail us. We are here to serve you 24/7.
      </p>
    </div>
  );
};

export default ActivateAccount;

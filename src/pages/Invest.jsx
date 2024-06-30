import { useEffect, useState } from "react";
import { FaCopy, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import addressQR from "../assets/address.jpeg";
import { isMobile } from "react-device-detect";

const InvestPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [investment, setInvestment] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const firestore = getFirestore();
  const address = "TTsencRWSr3qioVVjb6BPQ4ACLGvgUuTqk";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard!");
  };

  const handleInvestmentSubmit = async () => {
    if (!investment || parseFloat(investment) < 100) {
      setError("The minimum investment amount is $100.");
      return;
    }
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(firestore, "userdata", user.uid);
        await setDoc(
          docRef,
          {
            uid: user.uid,
            email: user.email,
            investment: parseFloat(investment),
            isActivated: false,
          },
          { merge: true }
        );
        alert(
          "Your investment has been recorded. Your account will be activated within 24 hours after payment verification."
        );
        setInvestment("");
        setError("");
        navigate("/profile"); // Navigate to the profile page
      }
    } catch (error) {
      console.error("Error saving investment:", error);
      setError(
        "An error occurred while processing your investment. Please try again."
      );
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
    return <div className="ml-2 mt-2 font-bold">Loading...</div>;
  }

  return (
    <div className="max-w-lg min-h-screen mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-extrabold mb-4 text-indigo-700 flex items-center">
        <FaCheckCircle className="mr-2" /> Make an Investment
      </h2>
      <h3 className="text-xl font-extrabold mb-4 text-gray-900 flex border-b-2 border-indigo-700 pb-2">
        Follow these steps to invest:
      </h3>

      {/* Step 1: Enter Investment Amount */}
      <div className="mb-4">
        <label className="block font-bold text-lg">
          Step 1: Enter the amount you want to invest (minimum $100):
        </label>
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mt-2 bg-gray-100 focus:outline-none"
          min="100"
          placeholder="Enter investment amount in USD"
          required
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Step 2: Deposit to TRC20 Address */}
      <p className="text-gray-700 mb-4 font-medium text-lg">
        <span className="font-bold">Step 2: </span> Deposit the entered amount
        from your <strong>Binance</strong> to this address using{" "}
        <strong>TRC20</strong>.
      </p>
      <label className="block font-bold mb-2 text-indigo-700">
        TRC20 Address:
      </label>
      <div className="mb-4">
        <img
          src={addressQR}
          alt="Address QR Code"
          className="w-full rounded-lg shadow-md"
        />
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

      {/* Step 3: Submit Payment Proof */}
      <div className="mb-4">
        <label className="block font-bold mb-2 text-lg">
          Step 3: After payment, submit your Payment TRXID and Screenshot to:
        </label>
        <p className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-indigo-600 flex items-center font-bold text-lg">
          alphainvestmentsone@hotmail.com
        </p>
      </div>

      <button
        onClick={handleInvestmentSubmit}
        className="w-full p-3 bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 text-white rounded-lg font-bold mt-4 transition-colors duration-300"
      >
        I have completed the investment process
      </button>
      <p className="text-gray-700 mt-6 font-medium text-lg">
        Your investment will be verified within 24 hours. In case of any issues,
        feel free to email us. We are here to serve you 24/7.
      </p>
    </div>
  );
};

export default InvestPage;

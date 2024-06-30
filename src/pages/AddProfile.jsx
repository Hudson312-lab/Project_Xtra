import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [binanceId, setBinanceId] = useState("");
  const [trc20Address, setTrc20Address] = useState("");
  const [referralUid, setReferralUid] = useState("");
  const [country, setCountry] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const id = user.uid;
        setUid(id);

        try {
          const docRef = doc(db, "profiles", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUsername(data.username || "");
            setBinanceId(data.binanceId || "");
            setTrc20Address(data.trc20Address || "");
            setReferralUid(data.referralUid || "");
            setCountry(data.country || "");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = async () => {
    if (user) {
      try {
        await setDoc(
          doc(db, "profiles", uid),
          {
            username,
            binanceId,
            trc20Address,
            referralUid,
            country,
            investment: 0,
            roi: 0,
            affiliateEarnings: 0,
            totalEarnings: 0,
            withdrawals: 0,
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Error updating profile:", error.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="font-bold mt-6 mb-6">Add Your Details</h2>
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Username
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Binance ID
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              value={binanceId}
              placeholder="Enter Binance ID"
              onChange={(e) => setBinanceId(e.target.value)}
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              TRC20 Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              value={trc20Address}
              placeholder="Enter TRC20 Address"
              onChange={(e) => setTrc20Address(e.target.value)}
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Referral UID
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              value={referralUid}
              placeholder="Enter Referral UID"
              onChange={(e) => setReferralUid(e.target.value)}
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Country
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              value={country}
              placeholder="Enter Country"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleClick}
          >
            Add / Update Details
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;

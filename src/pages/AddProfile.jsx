import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { auth, db, storage } from "../firebase";
import { isMobile } from "react-device-detect";

function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [binanceId, setBinanceId] = useState("");
  const [trc20Address, setTrc20Address] = useState("");
  const [referralUid, setReferralUid] = useState("");
  const [country, setCountry] = useState("");
  const [uid, setUid] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [pictureUrl, setPictureUrl] = useState("");
  const navigate = useNavigate();

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
            setPictureUrl(data.pictureUrl || "");

            // Redirect if data is already filled
            if (
              data.username &&
              data.binanceId &&
              data.trc20Address &&
              data.referralUid &&
              data.country
            ) {
              navigate("/profiledisplay");
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        navigate('/'); // Redirect to home page if not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleClick = async () => {
    if (user) {
      // Check if all required fields are filled
      if (!username || !binanceId || !trc20Address || !referralUid || !country || !profilePicture) {
        alert("Please fill in all required fields and submit a profile picture.");
        return;
      }

      try {
        const profileData = {
          uid, 
          username,
          binanceId,
          trc20Address,
          referralUid,
          country,
          investment: 10,
          roi: 0,
          affiliateEarnings: 0,
          totalEarnings: 0,
          withdrawals: 0,
          level: 'nil',
        };

        if (profilePicture) {
          const pictureUrl = await uploadPicture(profilePicture);
          profileData.pictureUrl = pictureUrl;
        }

        await setDoc(doc(db, "profiles", uid), profileData, { merge: true });
        alert("Details submitted successfully!");
        navigate("/profiledisplay"); // Redirect after successful submission
      } catch (error) {
        console.error("Error updating profile:", error.message);
      }
    }
  };

  const handlePictureChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const compressedFile = await compressImage(file);
      setProfilePicture(compressedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPictureUrl(event.target.result);
      };
      reader.readAsDataURL(compressedFile);
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1, // Maximum size in MB
      maxWidthOrHeight: 1920, // Maximum width or height
      useWebWorker: true, // Use web worker for faster compression
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      return file;
    }
  };

  const uploadPicture = async (file) => {
    try {
      const storageRef = ref(storage, `profilePictures/${uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading picture:", error);
      throw error;
    }
  };

  const handleFileInputClick = (e) => {
    e.target.value = null;
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

  if (loading) {
    return <div className='ml-2 mt-2 font-bold'>Checking Profile Details...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="font-extrabold text-3xl mt-4 mb-6">Add Your Investment Account Details</h2>
      
      <div className="w-full max-w-lg mb-6">
        {pictureUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={pictureUrl}
              alt="Profile"
              className="rounded-full h-32 w-32 object-cover"
            />
          </div>
        )}
        <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
          Profile Picture
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="file"
          accept="image/*"
          onClick={handleFileInputClick}
          onChange={handlePictureChange}
          required
        />
      </div>

      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
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
            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
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
            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
              TRC20 Address (to receive USDT)
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
            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
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
            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
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
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

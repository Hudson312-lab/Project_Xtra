import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useEffect } from 'react';
import signupIllustration from '../assets/main.jpg';

const Home = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="bg-gray-50 p-10  max-w-sm w-full text-center mb-8">
        <p className="text-gray-800 font-bold mb-8">
          Please register if you are a new user or log in if you have already signed up.
        </p>
        <div className="space-y-4">
          <button
            className="w-full py-3 px-5 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            onClick={() => navigate('/signup')}
          >
            Register
          </button>
          <button
            className="w-full py-3 px-5 bg-gray-400 text-gray-800 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
            onClick={() => navigate('/signin')}
          >
            Log In
          </button>
        </div>
      </div>
      <img
        src={signupIllustration}
        alt="Signup illustration"
        className="h-auto w-full flex-grow mb-0"
      />
    </div>
  );
};

export default Home;

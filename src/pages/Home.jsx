import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import  { useEffect } from 'react';

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
    <div className="min-h-screen flex justify-center">
      <div className="bg-gray-100 p-10 shadow-xl max-w-sm w-full text-center">
        <h2 className="text-3xl font-bold mb-5 text-gray-900">Welcome</h2>
        <p className="text-gray-800 mb-8 font-bold text-2xl">Join us to make more money online</p>
        <p className="text-gray-600 font-medium mb-8">Please register if you are a new user or log in if you have already signed up.</p>
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
    </div>
  );
};

export default Home;

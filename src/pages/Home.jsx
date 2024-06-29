
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500">
      <div className="bg-white p-10  shadow-xl max-w-sm w-full text-center">
        <h2 className="text-3xl font-bold mb-5 text-gray-900">Welcome</h2>
        <p className="text-gray-600 mb-8 font-semibold">Join us and start your journey</p>
        <div className="space-y-4">
          <button
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            onClick={() => navigate('/signup')}
          >
            Register 
          </button>
          <button
            className="w-full py-2 px-4 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
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

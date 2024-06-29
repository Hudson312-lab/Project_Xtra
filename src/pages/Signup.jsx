import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';
import signupIllustration from '../assets/abc.png'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ email, password }));
  };

  useEffect(() => {
    if (authState.status === 'succeeded') {
      console.log('Signup successful');
    }
  }, [authState.status]);

  return (
    <div className="min-h-screen flex flex-col  bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Create an account</h2>
        <p className="mb-4 text-gray-600 font-bold">Achieve financial growth and freedom</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 font-semibold">
          {authState.status === 'loading' ? 'Loading...' : 'Sign Up'}
        </button>
        {authState.error && <p className="text-red-500 mt-2">{authState.error}</p>}
      </form>
      <img src={signupIllustration} alt="Signup illustration" className="h-auto w-full mb-0" />
    </div>
  );
};

export default Signup;

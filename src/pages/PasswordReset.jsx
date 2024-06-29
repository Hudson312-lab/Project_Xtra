import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/auth/authSlice';
import { isMobile } from 'react-device-detect';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  useEffect(() => {
    if (authState.status === 'succeeded') {
      console.log('Password reset email sent');
    }
  }, [authState.status]);

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
      <div className="min-h-screen flex items-center justify-center bg-indigo-100">
        <p className="text-gray-600 font-bold text-xl">
          Please switch to a mobile device for the best experience.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-indigo-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <p className="mb-4 text-gray-600 font-bold text-2xl">Reset Password</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 font-semibold">
          {authState.status === 'loading' ? 'Loading...' : 'Reset Password'}
        </button>
        {authState.error && <p className="text-red-500 mt-2">{authState.error}</p>}
      </form>
    </div>
  );
};

export default PasswordReset;

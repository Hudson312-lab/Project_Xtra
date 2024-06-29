import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../features/auth/authSlice';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin({ email, password }));
  };

  useEffect(() => {
    if (authState.status === 'succeeded') {
      console.log('Signin successful');
    }
  }, [authState.status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Sign In</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 p-2 w-full border border-indigo-300 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 p-2 w-full border border-indigo-300 rounded"
          required
        />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">
          {authState.status === 'loading' ? 'Loading...' : 'Sign In'}
        </button>
        {authState.error && <p className="text-red-500 mt-2">{authState.error}</p>}
      </form>
    </div>
  );
};

export default Signin;

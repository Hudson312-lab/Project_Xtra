import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin } from "../features/auth/authSlice";
import signinIllustration from "../assets/main.jpg";
import { isMobile } from "react-device-detect";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin({ email, password }));
  };

  const handleForgotPassword = () => {
    navigate("/passwordreset");
  };

  useEffect(() => {
    if (authState.user) {
      navigate("/activate");
    }
  }, [authState.user, navigate]);

  useEffect(() => {
    if (authState.status === "succeeded") {
      console.log("Signin successful");
      navigate("/binance");
    }
  }, [authState.status, navigate]);

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
    <div className="relative min-h-screen flex flex-col items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${signinIllustration})` }}>
      <div className="absolute inset-0 bg-black opacity-60 blur-sm"></div>
      <div className="relative z-10 p-8 bg-white bg-opacity-75 rounded w-96 mt-2">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <p className="mb-4 text-gray-600 font-bold text-2xl">Welcome back!</p>
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
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 font-semibold"
          >
            {authState.status === "loading" ? "Loading..." : "Sign In"}
          </button>
          {authState.error && (
            <p className="text-red-500 mt-2">{authState.error}</p>
          )}
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-indigo-600 mt-4 hover:underline w-full text-center font-bold"
          >
            Forgot Password?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;

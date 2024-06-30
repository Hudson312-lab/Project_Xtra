import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase'; 
import { setUser } from './features/auth/authSlice';
import Home from './pages/Home';
import Navbar from './componenets/Navbar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import PasswordReset from './pages/PasswordReset';
import ActivateAccount from './pages/ActivateAccount';
import Test from './pages/Test';
import UserProfile from './pages/AddProfile';
import UserProfileDisplay from './pages/Profiledisplay';
import InvestPage from './pages/Invest';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/test" element={<Test />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profiledisplay" element={<UserProfileDisplay />} />
        <Route path="/investpage" element={<InvestPage />} />
      </Routes>
    </Router>
  );
}

export default App;

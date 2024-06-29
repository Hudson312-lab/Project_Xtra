import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './componenets/Navbar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import PasswordReset from './pages/PasswordReset';
// import ActivateAccount from './pages/ActivateAccount';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        {/* <Route path="/activate" element={<ActivateAccount />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

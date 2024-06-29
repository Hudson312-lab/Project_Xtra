import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './componenets/Navbar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import PasswordReset from './pages/PasswordReset';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
      </Routes>
    </Router>
  );
}

export default App;

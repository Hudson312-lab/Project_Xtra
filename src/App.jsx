import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './componenets/Navbar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import PasswordReset from './pages/PasswordReset';
import ActivateAccount from './pages/ActivateAccount';
import Test from './pages/Test';

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;

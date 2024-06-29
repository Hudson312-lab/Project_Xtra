
// import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path based on your project structure

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img src={logo} alt="Alpha Investments Logo" className="h-10 w-12" /> {/* Adjust the height as needed */}
        </div>
        <div className="space-x-4">
          {/* <Link to="/" className="text-white">Home</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

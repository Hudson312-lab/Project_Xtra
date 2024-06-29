
// import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Alpha Investments</div>
        {/* <div className="space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/about" className="text-white">About</Link>
          <Link to="/contact" className="text-white">Contact</Link>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
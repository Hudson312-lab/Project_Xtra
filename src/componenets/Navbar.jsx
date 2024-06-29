import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">Homecheck</Link>
        </li>
        <li>
          <Link to="/about" className="text-white">About</Link>
        </li>
      </ul>
    </nav>
  );
}

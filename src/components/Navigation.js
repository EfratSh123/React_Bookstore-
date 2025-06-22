import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          🏠 Home
        </Link>
        <Link 
          to="/books" 
          className={`nav-link ${location.pathname === '/books' ? 'active' : ''}`}
        >
          📚 Books
        </Link>
        <Link
          to="/FeaturedBooks" 
          className={`nav-link ${location.pathname === '/FeaturedBooks' ? 'active' : ''}`}
        >
          ⭐ Featured Books
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
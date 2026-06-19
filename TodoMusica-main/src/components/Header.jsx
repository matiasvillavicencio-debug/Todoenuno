import { Link, useLocation } from 'react-router-dom';

function Header({ title, navLinks }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-brand">
        <span className="header-icon">🎵</span>
        <h1 className="header-title">{title}</h1>
      </div>
      
      <nav className="header-nav">
        {navLinks.map((link, index) => {
          if (link.isBtn) {
            const isSelected = location.pathname === link.path;
            return (
              <Link
                key={index}
                to={link.path}
                className={`btn header-nav-btn ${isSelected ? 'btn-active' : ''}`}
              >
                {link.label}
              </Link>
            );
          }

          const isLinkActive = location.pathname === link.path && !link.isBtn;
          return (
            <Link
              key={index}
              to={link.path}
              className={`nav-link ${isLinkActive ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
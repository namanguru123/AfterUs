import "./Header.css"
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"

export default function Header() {
  const handleSmoothScroll = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header>
      <div>
        
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-icon">
            <img src={logo} alt="AfterUs Logo" />
          </Link>
        </div>

        {/* Navigation - centered */}
        <nav aria-label="Main navigation">
          <a href="#about" onClick={(e) => handleSmoothScroll(e, "about")}>About</a>
          <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, "how-it-works")}>How it works</a>
          <a href="#security" onClick={(e) => handleSmoothScroll(e, "security")}>Security</a>
          
        </nav>

        {/* Actions - right */}
        <div className="navbar-actions">
          <Link to="/login" className="navbar-signin">Sign in</Link>
          <Link to="/register" className="navbar-get-started">Get started</Link>
        </div>

      </div>
    </header>
  )
}

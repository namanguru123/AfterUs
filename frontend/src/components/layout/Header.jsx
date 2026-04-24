import "./Header.css"
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleSmoothScroll = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsNavOpen(false);
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

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden ml-auto p-2 text-slate-600 hover:text-slate-900"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation - centered */}
        <nav aria-label="Main navigation" className={isNavOpen ? "nav-open" : ""}>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, "about")}>About</a>
          <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, "how-it-works")}>How it works</a>
          <a href="#security" onClick={(e) => handleSmoothScroll(e, "security")}>Security</a>
          
        </nav>

        {/* Actions - right */}
        <div className={`navbar-actions ${isNavOpen ? "nav-open" : ""}`}>
          <Link to="/login" className="navbar-signin">Sign in</Link>
          <Link to="/register" className="navbar-get-started">Get started</Link>
        </div>

      </div>
    </header>
  )
}

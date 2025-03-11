import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/Home.css";
import logo from "./images/logo-2.png";
import Aos from "aos";
import "aos/dist/aos.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    Aos.init();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Navbar with dynamic class based on scrolling */}
      <div className={`nav_bar ${isScrolled ? "new_nav_bar" : ""}`}>
        <img src={logo} alt="Logo" />
        <div>
          <ul className="nav_buttons">
            <li className={`nav_item ${location.pathname === "/" ? "active_nav_button" : ""}`}>
              <Link to="/" className="nav_link">Home</Link>
            </li>
            <li className={`nav_item ${location.pathname === "/about" ? "active_nav_button" : ""}`}>
              <Link to="/about" className="nav_link">About Us</Link>
            </li>
            <li className={`nav_item ${location.pathname === "/contactus" ? "active_nav_button" : ""}`}>
              <Link to="/contactus" className="nav_link">Contact Us</Link>
            </li>
            <li className={`nav_item ${location.pathname === "/login" ? "active_nav_button" : ""}`}>
              <Link to="/login" className="nav_link">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

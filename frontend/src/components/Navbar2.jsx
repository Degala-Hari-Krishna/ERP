import { useLocation, useNavigate } from "react-router-dom";
import "./css/Navbar2.css";
import logo from "./images/logo-2.png";
import { Link } from "react-router-dom";

function Navbar2() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="nav_bar">
      <img src={logo} alt="Logo" className="nav_logo" />
      <ul className="nav_buttons">
        <li className={`nav_item ${location.pathname === "/faculty/notifications" ? "active_nav_button" : ""}`}>
          <Link to="/faculty/notifications" className="nav_link">Notifications</Link>
        </li>
        <li className={`nav_item ${location.pathname === "/faculty/profile" ? "active_nav_button" : ""}`}>
          <Link to="/faculty/profile" className="nav_link">Profile</Link>
        </li>
        <li className="logout_btn" onClick={handleLogout}>
          Log out
        </li>
      </ul>
    </div>
  );
}

export default Navbar2;

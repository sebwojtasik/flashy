import { Link } from "react-router-dom";
import logo from "../../common/logo.svg";
import styles from "./Navbar.module.css";
const Navbar = ({ setIsOpen, isOpen }) => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className="navbar-brand">
        <img src={logo} className={styles.logo} alt="logo" />
      </Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.sidebarToggle}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => setIsOpen(!isOpen)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </nav>
  );
};

export default Navbar;

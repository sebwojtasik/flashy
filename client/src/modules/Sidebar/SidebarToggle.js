import styles from "./SidebarToggle.module.css";

const SidebarToggle = ({ isOpen, setIsOpen }) => {
  return (
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
  );
};

export default SidebarToggle;

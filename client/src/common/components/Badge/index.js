import styles from "./Badge.module.css";

const Badge = (props) => {
  return (
    <span
      style={{ fontSize: props.fontSize, ...props.style }}
      className={styles.badge}
    >
      {props.children}
    </span>
  );
};

export default Badge;

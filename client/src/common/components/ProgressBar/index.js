import styles from "./ProgressBar.module.css";

const ProgressBar = ({ completed }) => {
  return (
    <div className={styles.container}>
      <div className={styles.filler} style={{ width: `${completed}%` }}></div>
    </div>
  );
};

export default ProgressBar;

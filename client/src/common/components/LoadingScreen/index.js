import styles from "./LoadingScreen.module.css";
import happy from "./happy.svg";
import sad from "./sad.svg";

const LoadingScreen = (props) => {
  return (
    <div
      className={styles.layout}
      style={
        props.fullscreen
          ? { height: "100vh", width: "100vw" }
          : { height: "100%", width: "100%" }
      }
    >
      <div className={styles.container}>
        <img src={happy} alt="Loading..." className={styles.front} />
        <img src={sad} alt="Loading..." className={styles.back} />
      </div>
    </div>
  );
};

export default LoadingScreen;

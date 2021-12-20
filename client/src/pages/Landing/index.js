import styles from "./Landing.module.css";
import logo from "../../common/logo.svg";
import screenshot from "./screenshot.png";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Link to="/signin" className={styles.link}>
          sign in
        </Link>{" "}
        <Link to="/signup" className={styles.link}>
          sign up
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.column1}>
          <img src={logo} alt="Flashy logo"></img>
          <p>
            Flashy is an easy to use, open source spaced repetition system that
            you have been waiting for!
          </p>
          {/* <p>The future of flashcards has been redesigned.</p> */}
        </div>
        <div className={styles.column2}>
          <img
            className={styles.screenshot}
            src={screenshot}
            alt="Flashy screenshot"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Landing;

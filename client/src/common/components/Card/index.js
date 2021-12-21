import styles from "./Card.module.css";
import PropTypes from "prop-types";
import RetentionBadge from "../../../pages/Deck/RetentionBadge";
import Badge from "../Badge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(relativeTime);
dayjs.extend(calendar);

const Card = (props) => {
  const retention = Math.round(
    (props.flashcard.retention / props.flashcard.reviews) * 100
  );
  return (
    <div className={styles.card} onClick={props.onClick}>
      <div>
        <h2 className={styles.title}>{props.flashcard.front}</h2>
        <h3>{props.flashcard.back}</h3>
      </div>
      <div>
        {props.flashcard.new !== true ? (
          <>
            <RetentionBadge fontSize="0.55em" retention={retention} />
            <Badge style={{ marginLeft: "0.5em" }} fontSize="0.55em">
              {dayjs(parseInt(props.flashcard.due)).format("D MMM")}
            </Badge>
          </>
        ) : (
          <Badge style={{ backgroundColor: "#39bbdb" }} fontSize="0.55em">
            New!
          </Badge>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  flashcard: PropTypes.object,
};

export default Card;

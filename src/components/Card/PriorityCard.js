import React from "react";
import styles from "./Card.module.css";
import Gravatar from "react-gravatar";
import BacklogSvg from "../../assets/svg/clockExclamation.svg";
import InProgressSvg from "../../assets/svg/InProgress.svg";
import TodoSvg from "../../assets/svg/circle.svg";
import DoneSvg from "../../assets/svg/done.svg";
import CancelledSvg from "../../assets/svg/cancel.svg";
import ThemeContext from "../../ThemeContext/ThemeContext";
import { useContext } from "react";

const Card = ({ data }) => {
  const isDark = useContext(ThemeContext);
  let statusIcon =
    data.status === "Backlog"
      ? BacklogSvg
      : data.status === "Todo"
      ? TodoSvg
      : data.status === "In progress"
      ? InProgressSvg
      : data.status === "Cancelled"
      ? CancelledSvg
      : DoneSvg;
  return (
    <div className={`${styles.card_container } ${isDark.isDark ? ' darkCard':'cardNormal'}`}>
      {/* first layer */}
      <div className={styles.cdt}>
        <div className={`${styles.p4} ${styles.colorgray2}`}>{data?.id}</div>
        <div className={styles.cdt_gra}>
          <Gravatar email={`${data?.userName}@gmail.com`} rating="g" />
        </div>
      </div>
      {/* second layer */}
      <div className={styles.cdm}>
        <img src={statusIcon} alt="" style={{ height: 12, width: 12 }} />

        <div className={`${styles.colorgray1} ${styles.p3} }`}>
          {data?.title}
        </div>
      </div>
      {/* third layer */}
      <div className={styles.cdb}>
        <div className={styles.cdb_features}>
          {data?.tag?.map((item, idx) => (
            <div className={styles.cdb_feature}>
              <div className={styles.cdb_feature_box}></div>
              <div
                className={`${styles.p3} ${styles.colorgray2} ${styles.fontmedium} `}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;

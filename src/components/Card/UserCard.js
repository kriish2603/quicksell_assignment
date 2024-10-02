import React from "react";
import styles from "./Card.module.css";
import ThemeContext from "../../ThemeContext/ThemeContext";
import { useContext } from "react";
import BacklogSvg from "../../assets/svg/clockExclamation.svg";
import InProgressSvg from "../../assets/svg/InProgress.svg";
import TodoSvg from "../../assets/svg/circle.svg";
import DoneSvg from "../../assets/svg/done.svg";
import CancelledSvg from "../../assets/svg/cancel.svg";

import LowPSvg from "../../assets/svg/lowP.svg";
import MedSvg from "../../assets/svg/medP.svg";
import HighSvg from "../../assets/svg/highP.svg";
import UrgentSvg from "../../assets/svg/urgentP.svg";
import NoPSvg from "../../assets/svg/noP.svg";

const Card = ({ data }) => {
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

  let priorityIcon =
    data.priority === 0
      ? NoPSvg
      : data.priority === 1
      ? LowPSvg
      : data.priority === 2
      ? MedSvg
      : data.priority === 3
      ? HighSvg
      : UrgentSvg;

  const isDark = useContext(ThemeContext);

  return (
    <div className={`${styles.card_container} ${isDark.isDark ? ' darkCard':'cardNormal'}`}>
      {/* top layer */}
      <div className={styles.cdt}>
        <div className={`${styles.p4} ${styles.colorgray2}`}>{data?.id}</div>
        <div className={styles.cdt_gra}>
          {/* <Gravatar email={`${data?.userName}@gmail.com`} rating="g" /> */}
        </div>
      </div>
      {/* middle layer */}
      <div className={styles.cdm}>
        <img src={statusIcon} alt="" style={{ height: 12, width: 12 }} />
        <div className={`${styles.colorgray1} ${styles.p3} `}>
          {data?.title}
        </div>
      </div>
      {/* bottom layer */}
      <div className={styles.cdb}>
        <div className={styles.cdb_features}>
          <div className={styles.cdb_feature}>
            <img
              src={priorityIcon}
              alt=""
              style={{ height: 12, width: 12 }}
              fill="white"
            />
          </div>
          {data?.tag?.map((item, idx) => (
            <div className={styles.cdb_feature}>
              <div className={styles.cdb_feature_box}></div>
              <div
                className={`${styles.p4} ${styles.colorgray2} ${styles.fontmedium}`}
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

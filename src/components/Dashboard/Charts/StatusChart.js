import React, { useEffect, useState } from "react";
import styles from "./DashboardLayout.module.css";
import BacklogSvg from "../../../assets/svg/clockExclamation.svg";
import InProgressSvg from "../../../assets/svg/InProgress.svg";
import TodoSvg from "../../../assets/svg/circle.svg";
import DoneSvg from "../../../assets/svg/done.svg";
import CancelledSvg from "../../../assets/svg/cancel.svg";
import MoreSvg from "../../../assets/svg/noP.svg";
import Card from "../../Card/StatusCard";

const sortTickets = (data, sortBy) => {
  let newObj = {};
  for (let [key, value] of Object.entries(data)) {
    if (sortBy === "title") {
      newObj[key] = value.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      newObj[key] = value.sort((a, b) => b[sortBy] - a[sortBy]);
    }
  }
  return newObj;
};

const StatusChart = ({ tickets, users, sortBy }) => {
  const [state, setState] = useState({});
  useEffect(() => {
    const result = tickets.reduce((c, { status, ...rest }) => {
      c[status] = c[status] || [];
      c[status].push({ status, ...rest });
      return c;
    }, {});
    const sorted = sortTickets(result, sortBy);
    setState(sorted);
  }, [tickets, users, sortBy]);

  return (
    <div className={styles.ds_chart}>
      {/* Backlog Section */}
      <div className={styles.chart_col}>
        <div className={styles.chart_head}>
          <div className={styles.l}>
            <img src={BacklogSvg} alt="" style={{ height: 15, width: 15 }} fill="white" />
            <div className={`${styles.p4}`}>Backlog</div>
            <div className={`${styles.p4} ${styles.colorgray3}`} style={{color:"gray"}}>
              {state["Backlog"] ? state["Backlog"].length : 0}
            </div>
          </div>
          <div className={styles.r}>
            <img src={MoreSvg} alt="" style={{ height: 15, width: 15 }} fill="white" />
          </div>
        </div>
        <div className={styles.chart_body}>
          {state["Backlog"]?.map((item, idx) => (
            <Card data={item} />
          ))}
          {(!state["Backlog"] || (state["Backlog"] && state["Backlog".length === 0])) && (
            <div className={styles.noItem}>
              <div className={`${styles.p3}`}>No item right now!</div>
            </div>
          )}
        </div>
      </div>
      {/* Todo Section */}
      <div className={styles.chart_col}>
        <div className={styles.chart_head}>
          <div className={styles.l}>
            <img src={TodoSvg} alt="" style={{ height: 15, width: 15 }} fill="white" />
            <div className={`${styles.p4}`}>Todo</div>
            <div className={`${styles.p4} ${styles.colorgray3}`}  style={{color:"gray"}}>
              {state["Todo"] ? state["Todo"].length : 0}
            </div>
          </div>
          <div className={styles.r}>
            <img src={MoreSvg} alt="" style={{ height: 15, width: 15 }} fill="white" />
          </div>
        </div>
        <div className={styles.chart_body}>
          {state["Todo"]?.map((item, idx) => (
            <Card data={item} />
          ))}
          {(!state["Todo"] || (state["Todo"] && state["Todo".length === 0])) && (
            <div className={styles.noItem}>
              <div className={`${styles.p3}`}>No item right now!</div>
            </div>
          )}
        </div>
      </div>
      {/* In progress Section */}
      <div className={styles.chart_col}>
        <div className={styles.chart_head}>
          <div className={styles.l}>
            <img
              src={InProgressSvg}
              alt=""
              style={{ height: 15, width: 15 }}
              fill="white"
            />
            <div className={`${styles.p4}`}>In progress</div>
            <div className={`${styles.p4} ${styles.colorgray3}`}  style={{color:"gray"}}>
              {state["In progress"] ? state["In progress"].length : 0}
            </div>
          </div>
          <div className={styles.r}>
            <img src={MoreSvg} alt="" style={{ height: 15, width: 15 }} fill="white" />
          </div>
        </div>
        <div className={styles.chart_body}>
          {state["In progress"]?.map((item, idx) => (
            <Card data={item} />
          ))}
          {(!state["In progress"] ||
            (state["In progress"] && state["In progress".length === 0])) && (
            <div className={styles.noItem}>
              <div className={`${styles.p3}`}>No item right now!</div>
            </div>
          )}
        </div>
      </div>
      {/* Done Section */}
      <div className={styles.chart_col}>
        <div className={styles.chart_head}>
          <div className={styles.l}>
            <img src={DoneSvg} alt="" style={{ height: 15, width: 15 }} fill="white" />
            <div className={`${styles.p4}`}>Done</div>
            <div className={`${styles.p4} ${styles.colorgray3}`} style={{color:"gray"}}>
              {state["Done"] ? state["Done"].length : 0}
            </div>
          </div>
          <div className={styles.r}>
            <img src={MoreSvg} alt="" style={{ height: 15, width: 15 }} fill="white" />
          </div>
        </div>
        <div className={styles.chart_body}>
          {state["Done"]?.map((item, ) => (
            <Card data={item} />
          ))}
          {(!state["Done"] || (state["Done"] && state["Done".length === 0])) && (
            <div className={styles.noItem}>
              <div className={`${styles.p3}`}>No item right now!</div>
            </div>
          )}
        </div>
      </div>
      {/* Cancelled Section */}
      <div className={styles.chart_col}>
        <div className={styles.chart_head}>
          <div className={styles.l}>
            <img
              src={CancelledSvg}
              alt=""
              style={{ height: 15, width: 15 }}
              fill="white"
            />
            <div className={`${styles.p4} `}>Cancelled</div>
            <div className={`${styles.p4} ${styles.colorgray3}`}  style={{color:"gray"}}>
              {state["Cancelled"] ? state["Cancelled"].length : 0}
            </div>
          </div>
          <div className={styles.r}>
            <img src={MoreSvg} alt="" style={{ height: 15, width: 15 }} fill="white" />
          </div>
        </div>
        <div className={styles.chart_body}>
          {state["Cancelled"]?.map((item, idx) => (
            <Card data={item} />
          ))}
          {(!state["Cancelled"] ||
            (state["Cancelled"] && state["Cancelled".length === 0])) && (
            <div className={styles.noItem}>
              <div className={`${styles.p3}`}>No item right now!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusChart;

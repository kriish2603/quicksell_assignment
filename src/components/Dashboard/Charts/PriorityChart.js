import React, { useEffect, useState } from "react";
import styles from "./DashboardLayout.module.css";
import LowPSvg from "../../../assets/svg/lowP.svg";
import MedSvg from "../../../assets/svg/medP.svg";
import HighSvg from "../../../assets/svg/highP.svg";
import UrgentSvg from "../../../assets/svg/urgentP.svg";
import NoPSvg from "../../../assets/svg/noP.svg";
import MoreSvg from "../../../assets/svg/noP.svg";
import Card from "../../Card/PriorityCard";

const sortTickets = (data, sortBy) => {
  let newObj = {};
  for (let [key] of Object.entries(data)) {
    if (sortBy === "title") {
      newObj[key] = data[key].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      newObj[key] = data[key].sort((a, b) => b[sortBy] - a[sortBy]);
    }
  }
  return newObj;
};

const PriorityChart = ({ tickets, users, sortBy }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    const result = tickets.reduce((c, { priority, ...rest }) => {
      c[priority] = c[priority] || [];
      c[priority].push({ priority, ...rest });
      return c;
    }, {});
    const sorted = sortTickets(result, sortBy);
    setState(sorted);
  }, [tickets, users, sortBy]);

  console.log(state);

  return (
    <div className={styles.ds_chart}>
      {/* Urgent Section */}
      <div className={styles.chart_col}>
        <div className={styles.chart_head}>
          <div className={styles.l}>
            <img
              src={UrgentSvg}
              alt=""
              style={{ height: 15, width: 15 }}
              fill="white"
            />
            <div className={`${styles.p4}`}>Urgent</div>
            <div className={`${styles.p4} ${styles.colorgray3}`}  style={{color:"gray"}}>
              {state["1"] ? state["1"].length : 0}
            </div>
          </div>
          <div className={styles.r}>
            <img
              src={MoreSvg}
              alt=""
              style={{ height: 15, width: 15 }}
              fill="white"
            />
          </div>
        </div>
        <div className={styles.chart_body}>
          {state["1"]?.map((item, ) => (
            <Card data={item} />
          ))}
          {(!state["1"] || (state["1"] && state["1"].length === 0)) && (
            <div className={styles.noItem}>
              <div className={`${styles.p3}`}>No item right now!</div>
            </div>
          )}
        </div>
      </div>
      {/* High Section */}
      <div className={styles.chart_col}>
        <div className={styles.chart_head}>
          <div className={styles.l}>
            <img
              src={HighSvg}
              alt=""
              style={{ height: 15, width: 15 }}
              fill="white"
            />
            <div className={`${styles.p4}`}>High</div>
            <div className={`${styles.p4} ${styles.colorgray3}`}  style={{color:"gray"}}>
              {state["2"] ? state["2"].length : 0}
            </div>
          </div>
          <div className={styles.r}>
            <img
              src={MoreSvg}
              alt=""
              style={{ height: 15, width: 15 }}
              fill="white"
            />
          </div>
        </div>
        <div className={styles.chart_body}>
          {state["2"]?.map((item, idx) => (
            <Card data={item} />
          ))}
          {(!state["2"] || (state["2"] && state["2"].length === 0)) && (
            <div className={styles.noItem}>
              <div className={`${styles.p3}`}>No item right now!</div>
            </div>
          )}
        </div>
      </div>
      {/* Medium Section */}
      <div className={styles.chart_col}>
        <div className={styles.chart_head}>
          <div className={styles.l}>
            <img
              src={MedSvg}
              alt=""
              style={{ height: 15, width: 15 }}
              fill="white"
            />
            <div className={`${styles.p4}`}>Medium</div>
            <div className={`${styles.p4} ${styles.colorgray3}`}  style={{color:"gray"}}>
              {state["3"] ? state["3"].length : 0}
            </div>
          </div>
          <div className={styles.r}>
            <img
              src={MoreSvg}
              alt=""
              style={{ height: 15, width: 15 }}
              fill="white"
            />
          </div>
        </div>
        <div className={styles.chart_body}>
          {state["3"]?.map((item, idx) => (
            <Card data={item} />
          ))}
          {(!state["3"] || (state["3"] && state["3"].length === 0)) && (
            <div className={styles.noItem}>
              <div className={`${styles.p3} `}>No item right now!</div>
            </div>
          )}
        </div>
      </div>
      {/* Low Section */}
      <div className={styles.chart_col}>
        <div className={styles.chart_head}>
          <div className={styles.l}>
            <img
              src={LowPSvg}
              alt=""
              style={{ height: 15, width: 15 }}
              fill="white"
            />
            <div className={`${styles.p4}`}>Low</div>
            <div className={`${styles.p4} ${styles.colorgray3}`}  style={{color:"gray"}}>
              {state["4"] ? state["4"].length : 0}
            </div>
          </div>
          <div className={styles.r}>
            <img
              src={MoreSvg}
              alt=""
              style={{ height: 15, width: 15 }}
              fill="white"
            />
          </div>
        </div>
        <div className={styles.chart_body}>
          {state["4"]?.map((item, idx) => (
            <Card data={item} />
          ))}
          {(!state["4"] || (state["4"] && state["4"].length === 0)) && (
            <div className={styles.noItem}>
              <div className={`${styles.p3}`}>No item right now!</div>
            </div>
          )}
        </div>
      </div>
      {/* No Priority Section */}
      <div className={styles.chart_col}>
        <div className={styles.chart_head}>
          <div className={styles.l}>
            <img
              src={NoPSvg}
              alt=""
              style={{ height: 15, width: 15 }}
              fill="white"
            />
            <div className={`${styles.p4}`}>No Priority</div>
            <div className={`${styles.p4} ${styles.colorgray3}`}  style={{color:"gray"}}>
              {state["0"] ? state["0"].length : 0}
            </div>
          </div>
          <div className={styles.r}>
            <img
              src={MoreSvg}
              alt=""
              style={{ height: 15, width: 15 }}
              fill="white"
            />
          </div>
        </div>
        <div className={styles.chart_body}>
          {state["0"]?.map((item, idx) => (
            <Card data={item} />
          ))}
          {(!state["0"] || (state["0"] && state["0"].length === 0)) && (
            <div className={styles.noItem}>
              <div className={`${styles.p3}`}>No item right now!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriorityChart;

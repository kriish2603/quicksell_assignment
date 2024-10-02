import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Popover } from "react-tiny-popover";
import FilterSVG from "../../assets/svg/filter.svg";
import ArrowDown from "../../assets/svg/arrow-down.svg";
import Select from "react-select";
import ToggleSwitch from "../../ThemeContext/ToggleSwitch";
import ThemeContext from "../../ThemeContext/ThemeContext";
import { useContext } from "react";
const GroupingOptions = [
  { value: "status", label: "Status" },
  { value: "user", label: "User" },
  { value: "priority", label: "Priority" },
];

const OrderingOptions = [
  { value: "priority", label: "Priority" },
  { value: "title", label: "Title" },
];

const Navbar = ({ filterState, setFilterState }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isDark = useContext(ThemeContext);
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid lightgray",
      backgroundColor: "white",
      minWidth: "120px",
    }),
  };

  return (
    <div className={ `${styles.navbar} ${isDark.isDark ? ' dark' : ''}`}>
      <div className={styles.status_selector_button}>
        <Popover
          isOpen={isPopoverOpen}
          positions={["bottom", "right"]}
          padding={10}
          reposition={true}
          onClickOutside={() => setIsPopoverOpen(false)}
          content={({ position, nudgedLeft, nudgedTop }) => (
            <div className={styles.statusfilter}>
              <div className={styles.filterGrp}>
                <div className={`${styles.p4} ${styles.colorgray2}`}>
                  Grouping
                </div>
                <div className={`${styles.p4}`}>
                  <Select
                    styles={selectStyles}
                    options={GroupingOptions}
                    value={filterState.grouping}
                    onChange={(e) => {
                      localStorage.setItem(
                        "filterState",
                        JSON.stringify({ ...filterState, grouping: e })
                      );
                      setFilterState((o) => ({ ...o, grouping: e }));
                    }}
                  />
                </div>
              </div>
              {/* filter 2 */}
              <div className={styles.filterGrp}>
                <div className={`${styles.p4} ${styles.colorgray2}`}>
                  Ordering
                </div>
                <div className={`${styles.p4}`}>
                  <Select
                    styles={selectStyles}
                    options={OrderingOptions}
                    value={filterState.ordering}
                    onChange={(e) => {
                      localStorage.setItem(
                        "filterState",
                        JSON.stringify({ ...filterState, ordering: e })
                      );
                      setFilterState((o) => ({ ...o, ordering: e }));
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        >
          <button
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className={styles.statusBtn}
          >
            <img
              src={FilterSVG}
              alt="horizontal-settings-mixer--v1"
              style={{ height: 15, width: 15 }}
              fill="white"
            />
            <div className={`${styles.p4}`}>Display</div>
            <img
              src={ArrowDown}
              alt="chevron-down"
              style={{ height: 15, width: 15 }}
            />
          </button>
        </Popover>
      </div>
      <div className={styles.switch}>
        {" "}
        <ToggleSwitch />
      </div>
    </div>
  );
};

export default Navbar;

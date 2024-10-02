import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import StatusChart from "./Charts/StatusChart";
import "./Dashboard.css";
import PriorityChart from "./Charts/PriorityChart";
import UserChart from "./Charts/UserChart";

const Dashboard = () => {
  const [filterState, setFilterState] = useState({
    grouping: { value: "status", label: "Status" },
    ordering: { value: "priority", label: "Priority" },
  });
  const [ticketsData, setTicketsData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    let filterStateFromLocalStorage = localStorage.getItem("filterState");
    if (filterStateFromLocalStorage !== null) setFilterState(JSON.parse(filterStateFromLocalStorage));

    fetchDataFromServer();
  }, []);

  console.log(filterState.grouping, filterState.ordering);

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      let fetchedUsers = response.data?.users?.length ? response.data?.users : [];

      const newTicketsArr = [];
      if (response.data?.tickets?.length) {
        for (let ticket of response.data?.tickets) {
          let idx = fetchedUsers.findIndex((user) => user.id === ticket.userId);
          newTicketsArr.push({
            ...ticket,
            userName: fetchedUsers[idx].name,
            userAvailable: fetchedUsers[idx].available,
          });
        }
      }

      if (newTicketsArr.length) setTicketsData(newTicketsArr);
      if (fetchedUsers?.length) setUsersData(fetchedUsers);
    } catch (err) {}
  };

  return (
    <div className="dashboard-container">
      <Navbar filterState={filterState} setFilterState={setFilterState} />

      {filterState.grouping.value === "status" && (
        <StatusChart
          tickets={ticketsData}
          users={usersData}
          sortBy={filterState.ordering.value}
        />
      )}
      {filterState.grouping.value === "priority" && (
        <PriorityChart
          tickets={ticketsData}
          users={usersData}
          sortBy={filterState.ordering.value}
        />
      )}
      {filterState.grouping.value === "user" && (
        <UserChart tickets={ticketsData} users={usersData} sortBy={filterState.ordering.value} />
      )}
    </div>
  );
};

export default Dashboard;

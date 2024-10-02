import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import ThemeContext from "./ThemeContext/ThemeContext";
import { useContext } from "react";

function App() {
  const isDark = useContext(ThemeContext);
  return (
    <div className={isDark.isDark ? 'App dark':'App'}>
      <Dashboard />
    </div>
  );
}

export default App;

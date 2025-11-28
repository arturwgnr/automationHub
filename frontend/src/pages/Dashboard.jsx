import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";

import "../styles/Dashboard.css";

export default function Dashboard() {
  const nav = useNavigate();

  return (
    <div className="dashboard-page">
      <Topbar />
      <h1>Dashboard</h1>

      <button onClick={() => nav("/estimates")}>Estimates</button>
      <button>Template</button>
      <button>Appointment</button>

      <br />
      <button onClick={() => nav("/")}>Logout</button>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import "../styles/Topbar.css";

export default function Topbar() {
  const nav = useNavigate();

  return (
    <div className="topbar">
      <h1 className="topbar-title">Automation Hub</h1>

      <div className="topbar-actions">
        <button className="lang-btn">EN</button>
        <button className="logout-btn" onClick={() => nav("/")}>
          Logout
        </button>
      </div>
    </div>
  );
}

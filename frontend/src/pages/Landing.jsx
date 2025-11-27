import { useNavigate } from "react-router-dom";

export default function Landing() {
  const nav = useNavigate();

  return (
    <div>
      <h1>Artur Wagner</h1>
      <button>about</button>
      <button onClick={() => nav("/login")}>login</button>
      <button onClick={() => nav("/register")}>register</button>
    </div>
  );
}

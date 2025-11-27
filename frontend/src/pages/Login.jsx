import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleLogin() {
    try {
      if (formData.email === "" || formData.password === "") {
        return alert("Insert corret information");
      }

      const res = await api.post("/auth/login", formData);

      const { token } = res.data;

      localStorage.setItem("token", token);

      nav("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <input
        name="email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        type="text"
        placeholder="Insert Email"
      />
      <input
        name="password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        type="password"
        placeholder="Insert Password"
      />
      <br />
      <button onClick={handleLogin}>Access</button>

      <nav>
        Dont have an account? <Link to={"/register"}>Register</Link>{" "}
      </nav>
    </div>
  );
}

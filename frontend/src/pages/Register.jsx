import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [repeatedPassword, setRepeatedPassword] = useState("");

  async function handleRegister() {
    try {
      if (formData.password !== repeatedPassword) {
        return alert("Passwords must match!");
      }

      const res = await api.post("/auth/register", formData);

      console.log(res.data);

      nav("/login");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <h1>Register Page</h1>
      <input
        required
        name="username"
        value={formData.username}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        type="text"
        placeholder="Insert Username"
      />
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
      <input
        value={repeatedPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
        type="password"
        placeholder="Repeate Password"
      />
      <br />
      <button onClick={handleRegister}>Register</button>

      <nav>
        Already have an account? <Link to={"/login"}>Click here</Link>{" "}
      </nav>
    </div>
  );
}

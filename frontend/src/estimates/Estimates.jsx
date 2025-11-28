import { useState } from "react";
import api from "../api/api";
import Topbar from "../components/Topbar";
import "../styles/Estimates.css";

export default function Estimates() {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    description: "",
    price: "",
  });

  function toggleModal() {
    setIsCreating((prev) => !prev);
    console.log(isCreating);
  }

  async function createEstimate() {
    try {
      const res = api.post("/estimates/", formData);

      console.log(res.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <Topbar />
      <h1>Estimates</h1>
      <button onClick={toggleModal}>Create Estimate</button>

      {/* MODAL */}
      {isCreating && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>New Estimate</h2>

            <input
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Title"
            />
            <input
              name="clientName"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Client Name"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Description"
            ></textarea>
            <input
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Price"
              type="number"
            />

            <button onClick={createEstimate}>Create</button>
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

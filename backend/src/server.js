import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import estimateRoutes from "./routes/estimates.routes.js";
import templateRoutes from "./routes/templates.routes.js";
import appointmentRoutes from "./routes/appointments.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import pdfRoutes from "./routes/pdf.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌌 I have all that I need in order to succeed!");
});

// MOUNT ROUTES
app.use("/auth", authRoutes);
app.use("/estimates", estimateRoutes);
app.use("/templates", templateRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/ai", aiRoutes);
app.use("/estimates", pdfRoutes);

app.listen(3000, () => {
  console.log("Selvagem! Server running on http://localhost:3000");
});

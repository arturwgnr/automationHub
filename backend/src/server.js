import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import authMiddleware from "./middlewares/authMiddleware.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

//GET
app.get("/", (req, res) => {
  res.send("🌌 I have all that I need in order to succeed!");
});

//AUTH
//POST
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(500)
        .json({ message: "Email already been used.", email });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { username, email, password: hashPassword },
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not registered" });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Wrong credentials!" });
    }

    const token = jwt.sign(
      { userId: existingUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successfull!", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//ESTIMATES
//POST
app.post("/estimates", async (req, res) => {
  try {
    const userId = req.userId;
    const { title, clientName, description, price } = req.body;

    const newEstimate = await prisma.estimate.create({
      data: { title, clientName, description, price, userId },
    });

    res.status(201).json({ message: "New estimate:", newEstimate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET
app.get("/estimates", async (req, res) => {
  try {
    const userId = req.userId;

    const userEstimates = await prisma.estimate.findMany({
      where: { userId },
    });

    if (userEstimates.length === 0) {
      return res.status(200).json({ message: "User has no estimates" });
    }

    res.status(200).json({ message: "User estimates:", userEstimates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/estimates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userEstimate = await prisma.estimate.findUnique({
      where: { id: Number(id) },
    });

    if (!userEstimate) {
      return res.status(400).json({ message: "Estimate not found" });
    }

    if (userEstimate.userId !== req.userId) {
      return res.status(401).json({ message: "Access denied!" });
    }

    res.status(200).json({ message: `User estimate:`, userEstimate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//PUT
app.put("/estimates/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const { title, clientName, description, price } = req.body;

    const userEstimate = await prisma.estimate.findUnique({
      where: { id: Number(id) },
    });

    if (!userEstimate) {
      return res.status(404).json({ message: "Estimate not found!" });
    }

    if (userEstimate.userId !== req.userId) {
      return res.status(403).json({ message: "Access denied!" });
    }

    const updatedEstimates = await prisma.estimate.update({
      data: { title, clientName, description, price },
      where: { id: Number(id) },
    });
    //teste
    res
      .status(200)
      .json({ message: "Estimate updated successfully", updatedEstimates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE
app.delete("/estimates/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const userEstimate = await prisma.estimate.findUnique({
      where: { id: Number(id) },
    });

    if (!userEstimate) {
      return res.status(404).json({ message: "Estimate not found!" });
    }

    if (userEstimate.userId !== req.userId) {
      return res.status(403).json({ message: "Access denied!" });
    }

    const deletedEstimate = await prisma.estimate.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Deleted successfully", deletedEstimate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//server
app.listen(3000, () => {
  console.log(`Selvagem! Server is running on: http://localhost:3000`);
});

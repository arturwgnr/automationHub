import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
const prisma = new PrismaClient();

// CREATE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { title, clientName, description, price } = req.body;

    const newEstimate = await prisma.estimate.create({
      data: { title, clientName, description, price, userId },
    });

    res.status(201).json({ message: "New estimate", newEstimate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const userEstimates = await prisma.estimate.findMany({
      where: { userId },
    });

    if (userEstimates.length === 0) {
      return res.status(200).json({ message: "User has no estimates" });
    }

    res.status(200).json({ message: "User estimates", userEstimates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ONE
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const userEstimate = await prisma.estimate.findUnique({
      where: { id: Number(id) },
    });

    if (!userEstimate) {
      return res.status(404).json({ message: "Estimate not found" });
    }

    if (userEstimate.userId !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ message: "User estimate", userEstimate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, clientName, description, price } = req.body;

    const userEstimate = await prisma.estimate.findUnique({
      where: { id: Number(id) },
    });

    if (!userEstimate) {
      return res.status(404).json({ message: "Estimate not found" });
    }

    if (userEstimate.userId !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedEstimate = await prisma.estimate.update({
      where: { id: Number(id) },
      data: { title, clientName, description, price },
    });

    res
      .status(200)
      .json({ message: "Estimate updated successfully", updatedEstimate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const userEstimate = await prisma.estimate.findUnique({
      where: { id: Number(id) },
    });

    if (!userEstimate) {
      return res.status(404).json({ message: "Estimate not found" });
    }

    if (userEstimate.userId !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const deleted = await prisma.estimate.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Estimate deleted", deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
const prisma = new PrismaClient();

// GET ALL
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const appointments = await prisma.appointment.findMany({
      where: { userId },
    });

    if (appointments.length === 0) {
      return res.status(200).json({ message: "User has no appointments yet" });
    }

    res.status(200).json({ message: "User appointments", appointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ONE
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(id) },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ message: "User appointment", appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { title, date, hour } = req.body;

    const newAppointment = await prisma.appointment.create({
      data: { title, date, hour, userId },
    });

    res.status(201).json({ message: "Appointment created", newAppointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, date, hour } = req.body;

    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(id) },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updated = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { title, date, hour },
    });

    res.status(200).json({ message: "Appointment updated", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(id) },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const deleted = await prisma.appointment.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Appointment deleted", deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

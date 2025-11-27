import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
const prisma = new PrismaClient();

// CREATE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { title, content } = req.body;

    const newTemplate = await prisma.template.create({
      data: { title, content, userId },
    });

    res
      .status(201)
      .json({ message: "Template created successfully", newTemplate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const userTemplates = await prisma.template.findMany({
      where: { userId },
    });

    if (userTemplates.length === 0) {
      return res.status(200).json({ message: "User has no templates yet" });
    }

    res.status(200).json({ message: "User templates", userTemplates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ONE
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const userTemplate = await prisma.template.findUnique({
      where: { id: Number(id) },
    });

    if (!userTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    if (userTemplate.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ message: "User template", userTemplate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, content } = req.body;

    const userTemplate = await prisma.template.findUnique({
      where: { id: Number(id) },
    });

    if (!userTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    if (userTemplate.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedTemplate = await prisma.template.update({
      where: { id: Number(id) },
      data: { title, content },
    });

    res.status(200).json({ message: "Template updated", updatedTemplate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const userTemplate = await prisma.template.findUnique({
      where: { id: Number(id) },
    });

    if (!userTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    if (userTemplate.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const deleted = await prisma.template.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Template deleted", deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

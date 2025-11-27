import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import PDFDocument from "pdfkit";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
const prisma = new PrismaClient();

// GENERATE PDF FOR ESTIMATE
router.get("/:id/pdf", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const userEstimate = await prisma.estimate.findUnique({
      where: { id: Number(id) },
    });

    if (!userEstimate) {
      return res.status(404).json({ message: "Estimate not found" });
    }

    if (userEstimate.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=estimate-${id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(22).text(userEstimate.title, { underline: true });
    doc.moveDown();

    doc.fontSize(14).text(`Client: ${userEstimate.clientName}`);
    doc.moveDown(0.5);

    doc.text(`Description: ${userEstimate.description || "None"}`);
    doc.moveDown(0.5);

    doc.text(`Price: €${userEstimate.price}`);
    doc.moveDown();

    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

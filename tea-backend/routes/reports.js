const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const db = require("../db");

router.get("/orders", async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT o.id, d.orgName AS dealer_name, f.orgName AS factory_name, t.name AS tea_type,
             o.quantity_kg, o.total_price, o.payment_method, o.status, o.created_at
      FROM orders o
      LEFT JOIN users d ON o.dealer_id = d.id
      LEFT JOIN users f ON o.factory_id = f.id
      LEFT JOIN tea_types t ON o.tea_type_id = t.id
      ORDER BY o.created_at DESC
    `);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=orders_report.pdf");

    const PDFDocument = require("pdfkit");
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    doc.pipe(res);

    doc.fontSize(18).text("Orders Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(
      "ID | Dealer | Factory | Tea Type | Qty (kg) | Price | Payment | Status | Date",
      { underline: true }
    );
    doc.moveDown(0.5);

    orders.forEach((order) => {
      const line = [
        order.id,
        order.dealer_name || "-",
        order.factory_name || "-",
        order.tea_type || "-",
        order.quantity_kg,
        "Rs. " + (order.total_price?.toFixed(2) || "0.00"),
        order.payment_method || "-",
        order.status || "-",
        new Date(order.created_at).toLocaleString("en-GB")
      ].join(" | ");

      doc.text(line, { lineGap: 2 });
    });

    doc.end();
  }
   catch (err) {
    console.error("❌ Error generating PDF report:", err.message);
    res.status(500).json({ error: "Failed to generate report" });
  }
});


module.exports = router;

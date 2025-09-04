// routes/orders.js
const express = require("express");
const router = express.Router();
const db = require("../db");
// const { jwtDecode } = require("jwt-decode");

// const token = localStorage.getItem("token");


      //,.,.,.,.,
//       console.log(token);
//       console.log("helo");
//        const decodededd = jwtDecode(token);
//       const idd = decodededd?.id;
// console.log(idd);

// GET orders by dealer (for dealer dashboard)
router.get("/dealer/:dealerId", async (req, res) => {
  const dealerId = req.params.dealerId;

  try {
    const [orders] = await db.query(
      `
    SELECT 
  o.id,
  fac.name AS factory_name,
  t.name AS tea_type,
  o.quantity_kg,
  o.total_price,
  o.payment_method,
  o.status,
  o.created_at
FROM orders o
LEFT JOIN factories fac ON o.factory_id = fac.id
LEFT JOIN tea_types t ON o.tea_type_id = t.id
WHERE o.dealer_id = ?
ORDER BY o.created_at DESC
  `,
      [dealerId]
    );
    res.json(orders);
  } catch (err) {
    console.error("Error fetching dealer orders:", err);
    res.status(500).json({ error: "Failed to fetch dealer orders" });
  }
});

// ADD a new order
router.post("/", async (req, res) => {
  const {
    dealer_id,
    factory_id,
    tea_type_id,
    quantity_kg,
    total_price,
    payment_method,
    status,
  } = req.body;

  try {
    await db.query(
      `INSERT INTO orders 
      (dealer_id, factory_id, tea_type_id, quantity_kg, total_price, payment_method, status, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [dealer_id, factory_id, tea_type_id, quantity_kg, total_price, payment_method, status || 'pending']
    );
    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Error placing order:", err);
    console.log(err.message)
    res.status(500).json({ error: "Failed to place order" });
  }
});

// DELETE an order by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM orders WHERE id = ?", [id]);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ error: "Failed to delete order" });
  }
});

module.exports = router;

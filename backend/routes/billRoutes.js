const express = require("express");
const router = express.Router();

const { getAllBills, paymentReceived , paidBills} = require("../controllers/billController");

router.get("/all", getAllBills);
router.post("/payment", paymentReceived);
router.get("/receivedPayment", paidBills);

module.exports = router;
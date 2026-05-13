const express = require("express");
const router = express.Router();

const { getAllBills } = require("../controllers/billController");

router.get("/all", getAllBills);

module.exports = router;
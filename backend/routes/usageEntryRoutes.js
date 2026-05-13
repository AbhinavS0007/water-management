const express = require("express");
const router = express.Router();

const {
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
} = require("../controllers/usageEntryController");

router.post("/", createEntry);
router.get("/", getEntries);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);


module.exports = router;
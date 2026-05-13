const express = require("express");
const router = express.Router();

const {
  createTubewell,
  getTubewells,
  deleteTubewell,
} = require("../controllers/tubewellController");

router.post("/", createTubewell);
router.get("/", getTubewells);
router.delete("/:id", deleteTubewell);

module.exports = router;
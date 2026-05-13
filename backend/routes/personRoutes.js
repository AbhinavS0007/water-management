const express = require("express");
const router = express.Router();

const { createPerson ,getPersons, deletePerson} = require("../controllers/personController");

router.post("/", createPerson);
router.get("/", getPersons);
router.delete("/:id", deletePerson);

module.exports = router;
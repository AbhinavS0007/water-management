const Person = require("../models/Person");

// ➕ Add Person (with duplicate check)
exports.createPerson = async (req, res) => {
    try {
      let { name, tubewell } = req.body;
  
      // VALIDATION
      if (!name || !tubewell) {
        return res.status(400).json({
          message: "Name and tubewell are required",
        });
      }
  
      // NORMALIZE
      name = name.trim();
  
      // DUPLICATE CHECK INSIDE SAME TUBEWELL
      const existing = await Person.findOne({
        name: new RegExp(`^${name}$`, "i"),
        tubewell,
      });
  
      if (existing) {
        return res.status(200).json({
          message: "Person already exists",
          person: existing,
        });
      }
  
      // CREATE
      const person = await Person.create({
        name,
        tubewell,
      });
  
      res.status(201).json({
        message: "Person created",
        person,
      });
  
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        message: "Server error",
      });
    }
  };

exports.getPersons = async (req, res) => {
    try {
      const { tubewell } = req.query;
  
      // CHECK QUERY
      if (!tubewell) {
        return res.status(400).json({
          message: "tubewell id required",
        });
      }
  
      // FIND PERSONS OF SAME TUBEWELL
      const persons = await Person.find({
        tubewell: tubewell,
      }).sort({ createdAt: -1 });
  
      res.status(200).json(persons);
  
    } catch (error) {
      console.error("GET PERSON ERROR:", error);
  
      res.status(500).json({
        message: "Error fetching persons",
        error: error.message,
      });
    }
  };

  exports.deletePerson = async (req, res) => {
    try {
      const { id } = req.params;
      
  
      const deletedPerson = await Person.findByIdAndDelete(id);
  
      if (!deletedPerson) {
        return res.status(404).json({
          success: false,
          message: "Person not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Person deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
const Doctor = require("../models/Doctor");


// GET ALL DOCTORS

const getDoctors = async (req, res) => {

  try {

    const doctors = await Doctor.getAll();

    res.status(200).json(doctors);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch doctors",
    });

  }
};


// CREATE DOCTOR

const createDoctor = async (req, res) => {

  try {

    const {
      name,
      specialty,
      experience,
      fee,
      image,
    } = req.body;

    const doctor = await Doctor.create({
      name,
      specialty,
      experience,
      fee,
      image,
    });

    res.status(201).json(doctor);

  } catch (error) {

    res.status(500).json({
      message: "Failed to create doctor",
    });

  }
};

module.exports = {
  getDoctors,
  createDoctor,
};

const PatientHistory =
  require("../models/PatientHistory");


// GET HISTORY

const getHistory = async (
  req,
  res
) => {

  try {

    const history =
      await PatientHistory.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      history,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch history",
    });
  }
};


// CREATE HISTORY

const createHistory = async (
  req,
  res
) => {

  try {

    const {
      patientName,
      doctorName,
      disease,
      medicines,
      notes,
      appointmentDate,
    } = req.body;

    const history =
      await PatientHistory.create({
        patientName,
        doctorName,
        disease,
        medicines,
        notes,
        appointmentDate,
      });

    res.status(201).json({
      success: true,
      history,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to create history",
    });
  }
};


// DELETE HISTORY

const deleteHistory = async (
  req,
  res
) => {

  try {

    await PatientHistory.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "History deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Delete failed",
    });
  }
};


module.exports = {
  getHistory,
  createHistory,
  deleteHistory,
};
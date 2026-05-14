const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    specialty: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    fee: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Doctor ||
  mongoose.model("Doctor", doctorSchema);
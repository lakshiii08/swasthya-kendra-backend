// backend/models/Appointment.js

const supabase = require("../config/supabase");

class Appointment {
  // Create appointment
  static async create(appointmentData) {
    const { data, error } = await supabase
      .from("appointments")
      .insert([appointmentData])
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  // Get all appointments
  static async getAll() {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  // Find appointment by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;

    return data;
  }

  // Get appointments by patient email
  static async findByPatientEmail(email) {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("patientEmail", email)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  // Get appointments by doctor name
  static async findByDoctor(doctorName) {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("doctorName", doctorName)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  // Update appointment status
  static async updateStatus(id, status) {
    const { data, error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  // Delete appointment
  static async delete(id) {
    const { data, error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return data;
  }
}

module.exports = Appointment;
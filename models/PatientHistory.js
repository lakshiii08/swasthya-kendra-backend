// backend/models/PatientHistory.js

const supabase = require("../config/supabase");

class PatientHistory {
  // Create history record
  static async create(historyData) {
    const { data, error } = await supabase
      .from("patient_history")
      .insert([historyData])
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  // Get all history records
  static async getAll() {
    const { data, error } = await supabase
      .from("patient_history")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  // Find history by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from("patient_history")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;

    return data;
  }

  // Get history by patient name
  static async findByPatient(patientName) {
    const { data, error } = await supabase
      .from("patient_history")
      .select("*")
      .eq("patientName", patientName);

    if (error) throw error;

    return data;
  }

  // Delete history
  static async delete(id) {
    const { data, error } = await supabase
      .from("patient_history")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return data;
  }
}

module.exports = PatientHistory;
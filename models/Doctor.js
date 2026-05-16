// backend/models/Doctor.js

const supabase = require("../config/supabase");

class Doctor {
  // Create Doctor
  static async create(doctorData) {
    const { data, error } = await supabase
      .from("doctors")
      .insert([doctorData])
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  // Get all doctors
  static async getAll() {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  // Find doctor by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;

    return data;
  }

  // Update doctor
  static async update(id, updatedData) {
    const { data, error } = await supabase
      .from("doctors")
      .update(updatedData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  // Delete doctor
  static async delete(id) {
    const { data, error } = await supabase
      .from("doctors")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return data;
  }
}

module.exports = Doctor;
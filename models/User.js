// backend/models/User.js

const supabase = require("../config/supabase");

class User {
  // Create User
  static async create(userData) {
    const { data, error } = await supabase
      .from("users")
      .insert([userData])
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  // Find user by email
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) return null;

    return data;
  }

  // Find user by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;

    return data;
  }

  // Get all users
  static async getAll() {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) throw error;

    return data;
  }

  // Delete user
  static async delete(id) {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return data;
  }
}

module.exports = User;
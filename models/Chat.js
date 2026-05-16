// backend/models/Chat.js

const supabase = require("../config/supabase");

class Chat {
  // Create chat message
  static async create(chatData) {
    const { data, error } = await supabase
      .from("chats")
      .insert([chatData])
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  // Get all chats
  static async getAll() {
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  // Find chat by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;

    return data;
  }

  // Get chats by user ID
  static async findByUser(userId) {
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .eq("user", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  // Delete chat
  static async delete(id) {
    const { data, error } = await supabase
      .from("chats")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return data;
  }
}

module.exports = Chat;
import { supabase } from "../utils/supabase";

export async function loginWithUserTable({ username, password }) {
  const userTable = import.meta.env.VITE_USER_TABLE || "users";

  if (!username || !password) {
    return { ok: false, error: "Username dan password wajib diisi." };
  }

  try {
    const { data, error } = await supabase
      .from(userTable)
      .select("id, username")
      .eq("username", username)
      .eq("password", password)
      .maybeSingle();

    if (error) {
      return { ok: false, error: error.message };
    }

    if (!data) {
      return { ok: false, error: "Username atau password salah." };
    }

    return { ok: true, user: data };
  } catch (e) {
    return { ok: false, error: e?.message || "Gagal login." };
  }
}

export async function registerWithUserTable({ username, password }) {
  const userTable = import.meta.env.VITE_USER_TABLE || "users";

  if (!username || !password) {
    return { ok: false, error: "Username dan password wajib diisi." };
  }

  const normalizedUsername = String(username).trim();
  if (!normalizedUsername) {
    return { ok: false, error: "Username tidak valid." };
  }

  try {
    const { data: existing, error: checkError } = await supabase
      .from(userTable)
      .select("id")
      .eq("username", normalizedUsername)
      .maybeSingle();

    if (checkError) {
      return { ok: false, error: checkError.message };
    }

    if (existing) {
      return { ok: false, error: "Username sudah digunakan." };
    }

    const { data, error } = await supabase
      .from(userTable)
      .insert({ username: normalizedUsername, password })
      .select("id, username")
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, user: data };
  } catch (e) {
    return { ok: false, error: e?.message || "Gagal register." };
  }
}

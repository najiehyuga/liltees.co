const SUPABASE_URL =
"https://xhwpyzytwaiymeslhlx.supabase.co";

const SUPABASE_KEY =
"sb_publishable_xxxxxxxxxxxxxxxxx";

// Ambil createClient dari library
const { createClient } = supabase;

// Buat koneksi
const db = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
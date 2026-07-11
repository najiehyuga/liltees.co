const SUPABASE_URL =
"https://xhwpyzytwaiaymeslhlx.supabase.co";

const SUPABASE_KEY =
"sb_publishable_xxxxxxxxxxxxxxxxx";

const { createClient } = supabase;

const db = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
const SUPABASE_URL =
"https://xhwpyzytwaiaymeslhlx.supabase.co";

const SUPABASE_KEY =
"sb_publishable_Bgc1eoZadhu4U7IIFgtfFw_mXtxhD9e";

const { createClient } = supabase;

const db = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
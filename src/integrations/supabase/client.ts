import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://hvskdtdwqchgbakypylx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2c2tkdGR3cWNoZ2Jha3lweWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDM1NzEsImV4cCI6MjA3OTkxOTU3MX0.2KktnWkwk9XF-9HWKbjxCoYI45gqHC-Sg7SGydNoG9o";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

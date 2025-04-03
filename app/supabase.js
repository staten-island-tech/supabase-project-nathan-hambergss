import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://nommhrkgvcypgcnyosvn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vbW1ocmtndmN5cGdjbnlvc3ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MTYxNzksImV4cCI6MjA1OTE5MjE3OX0.6dilY72-W4YnZmeVXaXYYey5la6t4f8f04CWFTG2whA'
export const supabase = createClient(supabaseUrl, supabaseKey)
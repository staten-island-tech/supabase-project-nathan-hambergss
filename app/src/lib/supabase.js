import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://tbyhbqxclbgkiztvefxl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRieWhicXhjbGJna2l6dHZlZnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjk2NzIsImV4cCI6MjA2MjY0NTY3Mn0.v9-B8mWiWaDIYxJGTFoZhlDqsiTB8GG0yw76sW5ezAE'
export const supabase = createClient(supabaseUrl, supabaseKey)
import { createClient } from '@supabase/supabase-js'

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const envAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fall back to your project values or placeholders to prevent build/runtime crashes
const supabaseUrl = envUrl ?? 'https://eomickgamtakrchezrtd.supabase.co'
const supabaseAnonKey = envAnon ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvbWlja2dhbXRha3JjaGV6cnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2OTM1NDUsImV4cCI6MjA3MTI2OTU0NX0.Lph4VNTzdsnuWJEnOURFfoPXhy-GCDIsUGw_kDnyEYk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase

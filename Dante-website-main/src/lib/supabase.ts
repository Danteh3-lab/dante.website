import { createClient } from '@supabase/supabase-js'

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const envAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fall back to placeholders to prevent build/runtime crashes when env is missing.
// UI components (e.g., AuthForm) already detect missing config and show a user-friendly message.
const supabaseUrl = envUrl ?? 'https://placeholder.supabase.co'
const supabaseAnonKey = envAnon ?? 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase

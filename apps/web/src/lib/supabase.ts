import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env['NEXT_PUBLIC_SUPABASE_URL'] ?? 'https://bxeqhgoyevchvhndwnvu.supabase.co'
const supabasePublishableKey =
  process.env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'] ??
  'sb_publishable_k8KNTgtnR7orvmtoDd5alA_NNENPvO_'

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: false, // Public portal — no user login/signup required
  },
})

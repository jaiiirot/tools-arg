import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_KEY
    if (!url || !key) throw new Error('Supabase env vars missing')
    client = createClient(url, key, { auth: { persistSession: false } })
    console.log('[Supabase] Client initialized')
  }
  return client
}

export default { getSupabase }

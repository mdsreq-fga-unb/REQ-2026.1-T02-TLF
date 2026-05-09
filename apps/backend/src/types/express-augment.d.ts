import type { User } from '@supabase/supabase-js'
declare global {
  namespace Express {
    interface Request {
      /** Raw JWT string from `Authorization: Bearer …`*/
      accessToken?: string
      /** Resolved user*/
      authUser?: User
    }
  }
}
export {}

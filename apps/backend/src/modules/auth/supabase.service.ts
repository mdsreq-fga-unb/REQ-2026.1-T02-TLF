import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient

  constructor(private config: ConfigService) {
    this.supabaseClient = createClient(
      this.config.get<string>('app.supabaseUrl')!,
      this.config.get<string>('app.supabaseServiceKey')!,
    )
  }

  get auth(): SupabaseClient['auth'] {
    return this.supabaseClient.auth
  }
}

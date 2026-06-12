import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import * as ws from 'ws'

@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient
  constructor(private config: ConfigService) {
    const supabaseUrl = this.config.getOrThrow<string>('app.supabaseUrl')
    const supabaseServiceKey = this.config.getOrThrow<string>('app.supabaseServiceKey')
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new InternalServerErrorException(
        'Missing Supabase configuration: app.supabaseUrl and/or app.supabaseServiceKey',
      )
    }
    this.supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
  realtime: { transport: ws.WebSocket as unknown as typeof WebSocket },
})
  }
  get auth(): SupabaseClient['auth'] {
    return this.supabaseClient.auth
  }
}
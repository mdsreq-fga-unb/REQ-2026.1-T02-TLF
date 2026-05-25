import { Global, Module } from '@nestjs/common'
import { SupabaseService } from './supabase.service'

@Global()
@Module({
  imports: [],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}

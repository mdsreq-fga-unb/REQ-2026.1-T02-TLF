import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class SupabaseService {
    private config;
    private supabaseClient;
    constructor(config: ConfigService);
    get auth(): SupabaseClient['auth'];
}

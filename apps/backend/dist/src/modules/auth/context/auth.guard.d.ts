import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SupabaseService } from '@modules/supabase/supabase.service';
export declare class AuthGuard implements CanActivate {
    private readonly supabase;
    constructor(supabase: SupabaseService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractBearerToken;
}

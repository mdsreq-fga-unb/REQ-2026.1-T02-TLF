import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    DATABASE_URL: z.ZodURL;
    SUPABASE_URL: z.ZodURL;
    SUPABASE_ANON_KEY: z.ZodString;
    SUPABASE_SERVICE_KEY: z.ZodString;
    SUPABASE_JWT_SECRET: z.ZodString;
    HTTP_BODY_LIMIT: z.ZodString;
}, z.core.$strip>;
export type AppConfig = z.infer<typeof envSchema>;
export declare const appConfig: (() => {
    nodeEnv: string | undefined;
    port: number;
    databaseUrl: string | undefined;
    supabaseUrl: string | undefined;
    supabaseAnonKey: string | undefined;
    supabaseServiceKey: string | undefined;
    supabaseJwtSecret: string | undefined;
    httpBodyLimit: string | undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    nodeEnv: string | undefined;
    port: number;
    databaseUrl: string | undefined;
    supabaseUrl: string | undefined;
    supabaseAnonKey: string | undefined;
    supabaseServiceKey: string | undefined;
    supabaseJwtSecret: string | undefined;
    httpBodyLimit: string | undefined;
}>;
export declare function validate(config: Record<string, unknown>): {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    DATABASE_URL: string;
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_KEY: string;
    SUPABASE_JWT_SECRET: string;
    HTTP_BODY_LIMIT: string;
};
export {};

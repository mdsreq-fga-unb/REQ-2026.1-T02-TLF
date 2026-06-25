"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
exports.validate = validate;
const config_1 = require("@nestjs/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.coerce.number().default(3000),
    DATABASE_URL: zod_1.z.url(),
    SUPABASE_URL: zod_1.z.url(),
    SUPABASE_ANON_KEY: zod_1.z.string().min(10),
    SUPABASE_SERVICE_KEY: zod_1.z.string().min(10),
    SUPABASE_JWT_SECRET: zod_1.z.string().min(10),
    HTTP_BODY_LIMIT: zod_1.z.string(),
});
exports.appConfig = (0, config_1.registerAs)('app', () => ({
    nodeEnv: process.env.NODE_ENV,
    port: Number(process.env.PORT ?? 3000),
    databaseUrl: process.env.DATABASE_URL,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
    supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET,
    httpBodyLimit: process.env.HTTP_BODY_LIMIT,
}));
function validate(config) {
    const result = envSchema.safeParse(config);
    if (!result.success) {
        const errors = zod_1.z.treeifyError(result.error);
        throw new Error(`Variáveis de ambiente inválidas:\n${JSON.stringify(errors, null, 2)}`);
    }
    return result.data;
}
//# sourceMappingURL=app.config.js.map
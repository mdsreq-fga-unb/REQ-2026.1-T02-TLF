"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
const ws = require("ws");
let SupabaseService = class SupabaseService {
    constructor(config) {
        this.config = config;
        const supabaseUrl = this.config.getOrThrow('app.supabaseUrl');
        const supabaseServiceKey = this.config.getOrThrow('app.supabaseServiceKey');
        if (!supabaseUrl || !supabaseServiceKey) {
            throw new common_1.InternalServerErrorException('Missing Supabase configuration: app.supabaseUrl and/or app.supabaseServiceKey');
        }
        this.supabaseClient = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey, {
            realtime: { transport: ws.WebSocket },
        });
    }
    get auth() {
        return this.supabaseClient.auth;
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../auth/context/current-user.decorator");
const auth_guard_1 = require("../auth/context/auth.guard");
const pull_1 = require("./dto/pull");
const push_1 = require("./dto/push");
const sync_service_1 = require("./sync.service");
let SyncController = class SyncController {
    constructor(syncService) {
        this.syncService = syncService;
    }
    async pull(userId, dto) {
        return this.syncService.pull({ userId, lastUpdatedAt: dto.lastUpdatedAt });
    }
    async push(userId, query, body) {
        return this.syncService.push({
            userId,
            lastUpdatedAt: query.lastUpdatedAt,
            changes: body.changes,
        });
    }
};
exports.SyncController = SyncController;
__decorate([
    (0, common_1.Get)('pull'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pull_1.PullQueryDto]),
    __metadata("design:returntype", Promise)
], SyncController.prototype, "pull", null);
__decorate([
    (0, common_1.Post)('push'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, push_1.PushQueryDto,
        push_1.PushBodyDto]),
    __metadata("design:returntype", Promise)
], SyncController.prototype, "push", null);
exports.SyncController = SyncController = __decorate([
    (0, swagger_1.ApiBearerAuth)('supabase-jwt'),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Token não fornecido, inválido ou expirado' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('sync'),
    __metadata("design:paramtypes", [sync_service_1.SyncService])
], SyncController);
//# sourceMappingURL=sync.controller.js.map
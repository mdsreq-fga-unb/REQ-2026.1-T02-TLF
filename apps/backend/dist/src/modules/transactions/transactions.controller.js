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
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transactions_service_1 = require("./transactions.service");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const filter_transactions_dto_1 = require("./dto/filter-transactions.dto");
const update_transaction_dto_1 = require("./dto/update-transaction.dto");
const auth_guard_1 = require("../auth/context/auth.guard");
const current_user_decorator_1 = require("../auth/context/current-user.decorator");
const transaction_list_response_dto_1 = require("./dto/transaction-list.response.dto");
const transaction_detail_response_dto_1 = require("./dto/transaction-detail.response.dto");
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    create(dto, userId) {
        return this.transactionsService.create(userId, dto);
    }
    findAll(userId, query) {
        return this.transactionsService.findAll(userId, query);
    }
    findOne(userId, id) {
        return this.transactionsService.findOne({
            userId,
            id,
        });
    }
    update(userId, id, dto) {
        return this.transactionsService.update({
            userId,
            id,
            dto,
        });
    }
    remove(userId, id) {
        return this.transactionsService.remove({
            userId,
            id,
        });
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: transaction_detail_response_dto_1.TransactionDetailResponseDto,
        description: 'Transação criada com sucesso',
    }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, String]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: transaction_list_response_dto_1.TransactionListResponseDto,
        description: 'Lista de transações encontrada com sucesso',
    }),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_transactions_dto_1.FilterTransactionsDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: transaction_detail_response_dto_1.TransactionDetailResponseDto,
        description: 'Transação encontrada',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Transação não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: transaction_detail_response_dto_1.TransactionDetailResponseDto,
        description: 'Transação atualizada com sucesso',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Transação não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado para atualização' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_transaction_dto_1.UpdateTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transação deletada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Transação não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado para deleção' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "remove", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)('transactions'),
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map
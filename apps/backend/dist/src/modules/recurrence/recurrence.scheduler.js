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
var RecurrenceScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurrenceScheduler = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const recurrence_service_1 = require("./recurrence.service");
let RecurrenceScheduler = RecurrenceScheduler_1 = class RecurrenceScheduler {
    constructor(recurrenceService) {
        this.recurrenceService = recurrenceService;
        this.logger = new common_1.Logger(RecurrenceScheduler_1.name);
    }
    async handleDailyRecurrences() {
        this.logger.log('Starting recurrence generation job...');
        try {
            await this.recurrenceService.generateTransactionsFromRecurrences();
            this.logger.log('Recurrence generation finished successfully');
        }
        catch (error) {
            this.logger.error('Recurrence generation failed', error);
        }
    }
};
exports.RecurrenceScheduler = RecurrenceScheduler;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *', { timeZone: 'America/Sao_Paulo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecurrenceScheduler.prototype, "handleDailyRecurrences", null);
exports.RecurrenceScheduler = RecurrenceScheduler = RecurrenceScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [recurrence_service_1.RecurrenceService])
], RecurrenceScheduler);
//# sourceMappingURL=recurrence.scheduler.js.map
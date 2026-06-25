"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurrenceModule = void 0;
const common_1 = require("@nestjs/common");
const recurrence_service_1 = require("./recurrence.service");
const recurrence_controller_1 = require("./recurrence.controller");
const recurrence_scheduler_1 = require("./recurrence.scheduler");
let RecurrenceModule = class RecurrenceModule {
};
exports.RecurrenceModule = RecurrenceModule;
exports.RecurrenceModule = RecurrenceModule = __decorate([
    (0, common_1.Module)({
        controllers: [recurrence_controller_1.RecurrenceController],
        providers: [recurrence_service_1.RecurrenceService, recurrence_scheduler_1.RecurrenceScheduler],
    })
], RecurrenceModule);
//# sourceMappingURL=recurrence.module.js.map
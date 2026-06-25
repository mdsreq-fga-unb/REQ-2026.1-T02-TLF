"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMonths = exports.subMonths = void 0;
const subMonths = (date, months) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - months);
    return newDate;
};
exports.subMonths = subMonths;
const addMonths = (date, months) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
};
exports.addMonths = addMonths;
//# sourceMappingURL=date.js.map
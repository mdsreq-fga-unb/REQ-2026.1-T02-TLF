"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((property, ctx) => {
    const user = ctx.switchToHttp().getRequest().authUser;
    if (!user) {
        throw new common_1.UnauthorizedException('Usuário não autenticado');
    }
    if (property !== undefined) {
        return user[property];
    }
    return user;
});
//# sourceMappingURL=current-user.decorator.js.map
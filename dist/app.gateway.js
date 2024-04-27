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
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const token_service_1 = require("./help/token.service");
const schedule_1 = require("@nestjs/schedule");
let AppGateway = class AppGateway {
    constructor(jwtHelpService) {
        this.jwtHelpService = jwtHelpService;
        this.activeUsersList = [];
        this.activeFullUsersList = [];
    }
    handleDisconnect(client) {
        var _a;
        const accessToken = (_a = client.handshake.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('; ').find((cookie) => cookie.startsWith('access')).split('=')[1];
        const decodeToken = this.jwtHelpService.decodeJwtFromString(accessToken);
        this.activeUsersList = this.activeUsersList.filter(el => el !== (decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.email));
        this.activeFullUsersList = this.activeFullUsersList.filter(el => el.email !== (decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.email));
    }
    handleConnection(client, ...args) {
        var _a;
        const accessToken = (_a = client.handshake.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('; ').find((cookie) => cookie.startsWith('access')).split('=')[1];
        const decodeToken = this.jwtHelpService.decodeJwtFromString(accessToken);
        this.activeUsersList = [...this.activeUsersList, decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.email];
        const fullClient = {
            email: decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.email,
            socketId: client.id,
            userId: decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.userId
        };
        this.activeFullUsersList = [...this.activeFullUsersList, fullClient];
    }
    handleUpdateUserList() {
        this.server.emit('updateUsers', { users: this.activeFullUsersList });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, schedule_1.Cron)('5 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleUpdateUserList", null);
AppGateway = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({ cors: true, transports: ['websocket'] }),
    __metadata("design:paramtypes", [token_service_1.HelpJwtService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map
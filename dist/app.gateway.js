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
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const token_service_1 = require("./help/token.service");
const schedule_1 = require("@nestjs/schedule");
const jwt_auth_guard_1 = require("./modules/auth/jwt-auth.guard");
let AppGateway = class AppGateway {
    constructor(jwtHelpService) {
        this.jwtHelpService = jwtHelpService;
        this.activeUsersList = [];
        this.activeFullUsersList = [];
        this.clientsPeerId = [];
    }
    handleDisconnect(client) {
        var _a;
        const accessToken = (_a = client.handshake.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('; ').find((cookie) => cookie.startsWith('access')).split('=')[1];
        const decodeToken = this.jwtHelpService.decodeJwtFromString(accessToken);
        this.activeUsersList = this.activeUsersList.filter(el => el !== (decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.email));
        this.activeFullUsersList = this.activeFullUsersList.filter(el => el.email !== (decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.email));
        this.clientsPeerId = this.clientsPeerId.filter(client => client.userId !== (decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.userId));
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
    handleSendPeerId(data) {
        this.clientsPeerId = [...this.clientsPeerId, data];
    }
    handleGetPeerIdByUserId(data) {
        var _a;
        const { userId } = data;
        console.log(this.clientsPeerId);
        return (_a = this.clientsPeerId.filter(client => client.userId === userId)[0]) === null || _a === void 0 ? void 0 : _a.peerID;
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
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send-peer-id'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AppGateway.prototype, "handleSendPeerId", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('get-peerID-for-call'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppGateway.prototype, "handleGetPeerIdByUserId", null);
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
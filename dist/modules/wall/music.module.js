"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicModule = void 0;
const common_1 = require("@nestjs/common");
const wall_service_1 = require("./wall.service");
const wall_controller_1 = require("./wall.controller");
const token_module_1 = require("../../help/token.module");
const mongoose_1 = require("@nestjs/mongoose");
const musicAuthor_schema_1 = require("../../schemas/musicAuthor.schema");
let MusicModule = class MusicModule {
};
MusicModule = __decorate([
    (0, common_1.Module)({
        controllers: [wall_controller_1.MusicController],
        providers: [wall_service_1.MusicService],
        exports: [wall_service_1.MusicService],
        imports: [token_module_1.HelpJwtModule,
            mongoose_1.MongooseModule.forFeature([
                { name: musicAuthor_schema_1.MusicAuthor.name, schema: musicAuthor_schema_1.MusicAuthorSchema },
            ])
        ]
    })
], MusicModule);
exports.MusicModule = MusicModule;
//# sourceMappingURL=music.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const data_1 = require("./global/data");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const profile_module_1 = require("./modules/profile/profile.module");
const settings_controller_1 = require("./modules/settings/settings.controller");
const settings_service_1 = require("./modules/settings/settings.service");
const settings_module_1 = require("./modules/settings/settings.module");
const chat_module_1 = require("./modules/chat/chat.module");
const token_module_1 = require("./help/token.module");
const app_gateway_1 = require("./app.gateway");
const event_module_1 = require("./modules/event/event.module");
const posts_module_1 = require("./modules/posts/posts.module");
const interest_module_1 = require("./modules/interests/interest.module");
const mail_module_1 = require("./modules/mail/mail.module");
const schedule_1 = require("@nestjs/schedule");
const tariffs_module_1 = require("./modules/tariffs/tariffs.module");
const payment_module_1 = require("./modules/payment/payment.module");
const meetings_module_1 = require("./modules/meetings/meetings.module");
const groupsPosts_module_1 = require("./modules/groups/groupsPosts.module");
const music_module_1 = require("./modules/music/music.module");
const wall_module_1 = require("./modules/wall/wall.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController, settings_controller_1.SettingsController],
        providers: [app_service_1.AppService, settings_service_1.SettingsService, app_gateway_1.AppGateway],
        imports: [
            token_module_1.HelpJwtModule,
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forRoot(data_1.dbUrl),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            profile_module_1.ProfileModule,
            settings_module_1.SettingsModule,
            chat_module_1.ChatModule,
            event_module_1.EventModule,
            posts_module_1.PostsModule,
            interest_module_1.InterestsModule,
            mail_module_1.MailModule,
            tariffs_module_1.TariffsModule,
            payment_module_1.PaymentModule,
            meetings_module_1.MeetingsModule,
            groupsPosts_module_1.GroupsModule,
            music_module_1.MusicModule,
            wall_module_1.WallModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
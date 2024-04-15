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
exports.MeetingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const token_service_1 = require("../../help/token.service");
const mongoose_2 = require("mongoose");
const meeting_schema_1 = require("../../schemas/meeting.schema");
const user_schema_1 = require("../../schemas/user.schema");
let MeetingsService = class MeetingsService {
    constructor(jwtHelpService, meetingModel, userModel) {
        this.jwtHelpService = jwtHelpService;
        this.meetingModel = meetingModel;
        this.userModel = userModel;
    }
    async getAllMeetings() {
        const meetings = await this.meetingModel.find();
        const fullMeetingsInfo = await Promise.all(await meetings.map(async (meeting) => {
            const participantsFullInfo = await this.userModel.find({ userId: { $in: meeting.participants } }, {
                login: true, _id: false, avatar: true, name: true, userId: true
            });
            return {
                meetingId: meeting.meetingId,
                date: meeting.date,
                description: meeting.description,
                goal: meeting.goal,
                maxParticipants: meeting.maxParticipants,
                comments: meeting.comments,
                preview: meeting.preview,
                title: meeting.title,
                address: meeting.address,
                files: meeting.files,
                participants: participantsFullInfo,
                creatorId: meeting.creatorId
            };
        })).then(res => {
            return res;
        });
        return fullMeetingsInfo;
    }
    async createNewMeeting(request) {
        const { date, description, goal, title, address } = request.body;
        const user = this.jwtHelpService.decodeJwt(request);
        const newMeeting = {
            participants: [user.userId],
            date,
            description,
            goal,
            title,
            address,
            meetingId: `meeting${Math.floor(Math.random() * 1000000)}`,
            creatorId: user.userId
        };
        const createdMeeting = await this.meetingModel.create(newMeeting);
        if (createdMeeting) {
            return createdMeeting;
        }
        else {
            throw new common_1.HttpException({ errorMessage: "Пожалуйста попробуйте снова" }, 500);
        }
    }
    async uploadMedia(request, file) {
        const { meetingId } = request.body;
        const updatedMeeting = await this.meetingModel.findOneAndUpdate({ meetingId: meetingId }, { $push: { files: { src: file.filename, type: file.mimetype } } }, { returnDocument: 'after' });
        const participantsFullInfo = await this.userModel.find({ userId: { $in: updatedMeeting.participants } }, {
            login: true, _id: false, avatar: true, name: true, userId: true
        });
        return {
            meetingId: updatedMeeting.meetingId,
            date: updatedMeeting.date,
            description: updatedMeeting.description,
            goal: updatedMeeting.goal,
            maxParticipants: updatedMeeting.maxParticipants,
            comments: updatedMeeting.comments,
            preview: updatedMeeting.preview,
            title: updatedMeeting.title,
            address: updatedMeeting.address,
            files: updatedMeeting.files,
            participants: participantsFullInfo
        };
    }
    async regInMeetings(request, meetingId) {
        try {
            const { userId } = this.jwtHelpService.decodeJwt(request);
            const updatedMeeting = await this.meetingModel.findOneAndUpdate({ meetingId: meetingId, $expr: { $lt: [{ $size: "$participants" }, "$maxParticipants"] } }, { $push: { participants: userId } }, { returnDocument: 'after' });
            const participantsFullInfo = await this.userModel.find({ userId: { $in: updatedMeeting.participants } }, {
                login: true, _id: false, avatar: true, name: true, userId: true
            });
            return {
                meetingId: updatedMeeting.meetingId,
                date: updatedMeeting.date,
                description: updatedMeeting.description,
                goal: updatedMeeting.goal,
                maxParticipants: updatedMeeting.maxParticipants,
                comments: updatedMeeting.comments,
                preview: updatedMeeting.preview,
                title: updatedMeeting.title,
                address: updatedMeeting.address,
                files: updatedMeeting.files,
                participants: participantsFullInfo
            };
        }
        catch (error) {
            throw new common_1.HttpException({ errorMessage: "Что-то пошло не так, попробуйте снова" }, 400);
        }
    }
    async sendCommentAboutMeeting(request) {
        const currentDate = new Date();
        const { userId } = this.jwtHelpService.decodeJwt(request);
        try {
            const newComment = {
                userId: userId,
                text: request.body.text,
                date: currentDate,
                meetingId: request.body.meetingId
            };
            const updatedMeeting = await this.meetingModel.findOneAndUpdate({ meetingId: newComment.meetingId }, {
                $push: { comments: newComment }
            }, { returnDocument: 'after' });
            return updatedMeeting;
        }
        catch (error) {
            throw new common_1.HttpException({ errorMessage: "Что-то пошло не так, попробуйте снова" }, 400);
        }
    }
    async getUserPlaces(request, userId) {
        const prevMeetings = await this.meetingModel.find({
            date: { $lt: new Date() },
            participants: { $elemMatch: { $eq: userId } }
        });
        const places = prevMeetings.map(el => el.address);
        return places;
    }
};
MeetingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(meeting_schema_1.Meeting.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [token_service_1.HelpJwtService,
        mongoose_2.Model,
        mongoose_2.Model])
], MeetingsService);
exports.MeetingsService = MeetingsService;
//# sourceMappingURL=meetings.service.js.map
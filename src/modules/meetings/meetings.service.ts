import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { Meeting, MeetingDocument } from 'src/schemas/meeting.schema';
import { MeetingComment } from 'src/interfaces/meetingComment.interface';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class MeetingsService {

  constructor(
    private jwtHelpService: HelpJwtService,
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}
  
  async getAllMeetings() {
    const meetings = await this.meetingModel.find();
    const fullMeetingsInfo = await Promise.all(await meetings.map(async (meeting) => {
      const participantsFullInfo = await this.userModel.find({ userId: { $in: meeting.participants }}, {
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
      }
    })).then(res => {
      return res
    })
    return fullMeetingsInfo;
  }

  async createNewMeeting(request: Request) {
    const { date, description, goal, title, address } = request.body;
    const user = this.jwtHelpService.decodeJwt(request);

    const newMeeting = {
      participants: [user.userId],
      date,
      description,
      goal,
      title,
      address,
      meetingId: `meeting${Math.floor(Math.random()*1000000)}`,
      creatorId: user.userId
    };
    const createdMeeting = await this.meetingModel.create(newMeeting);
    if (createdMeeting) {
      return createdMeeting;
    } else {
      throw new HttpException({ errorMessage: "Пожалуйста попробуйте снова" }, 500);
    }
  }

  async uploadMedia(request: Request, file: Express.Multer.File) {
    const { meetingId } = request.body;

    const updatedMeeting = await this.meetingModel.findOneAndUpdate(
      { meetingId: meetingId }, 
      { $push: { files: { src: file.filename, type: file.mimetype }} },
      { returnDocument: 'after' }
    );
    const participantsFullInfo = await this.userModel.find({ userId: { $in: updatedMeeting.participants }}, {
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
    }
  }

  async regInMeetings(request: Request, meetingId: string) {
    try {
      const { userId } = this.jwtHelpService.decodeJwt(request);

      const updatedMeeting = await this.meetingModel.findOneAndUpdate(
        { meetingId: meetingId, $expr: { $lt: [{ $size: "$participants" }, "$maxParticipants"] } }, 
        { $push: { participants: userId } }, 
        { returnDocument: 'after' }
      );
      const participantsFullInfo = await this.userModel.find({ userId: { $in: updatedMeeting.participants }}, {
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
      }
    } catch(error) {
      throw new HttpException({ errorMessage: "Что-то пошло не так, попробуйте снова" }, 400);
    }
  }

  async sendCommentAboutMeeting(request: Request) {
    const currentDate = new Date();
    const { userId } = this.jwtHelpService.decodeJwt(request);

    try {
      const newComment: MeetingComment = {
        userId: userId,
        text: request.body.text,
        date: currentDate,
        meetingId: request.body.meetingId
      }

      const updatedMeeting = await this.meetingModel.findOneAndUpdate({ meetingId: newComment.meetingId }, {
        $push: {comments: newComment}
      }, {returnDocument: 'after'});

      return updatedMeeting;
    } catch(error) {
      throw new HttpException({ errorMessage: "Что-то пошло не так, попробуйте снова" }, 400);
    }
  }

  async getUserPlaces(request: Request, userId: string) {
    const prevMeetings = await this.meetingModel.find({ 
        date: { $lt: new Date() },
        participants: { $elemMatch: { $eq: userId } }
    });
    const places = prevMeetings.map(el => el.address);
    return places;
}
}

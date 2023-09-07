import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { Meeting, MeetingDocument } from 'src/schemas/meeting.schema';

@Injectable()
export class MeetingsService {

  constructor(
    private jwtHelpService: HelpJwtService,
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>
  ) {}
  
  async getAllMeetings() {
    return 'Normal'
  }

  async createNewMeeting(request: Request) {
    const { participants, date, description, goal, title, address } = request.body;
    const newMeeting = {
      participants,
      date,
      description,
      goal,
      title,
      address
    };
    const createdMeeting = await this.meetingModel.create(newMeeting);
    if (createdMeeting) {
      return createdMeeting;
    } else {
      throw new HttpException({ errorMessage: "Пожалуйста попробуйте снова" }, 500);
    }
  }
}

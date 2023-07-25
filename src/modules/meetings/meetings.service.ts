import { Injectable } from '@nestjs/common';
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
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { Group, GroupsDocument } from 'src/schemas/groups.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class GroupsService {
  constructor(
    private jwtHelpService: HelpJwtService,
    @InjectModel(Group.name) private groupsModel: Model<GroupsDocument>,
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}
    
  async getAllGroups(request: Request) {
    const allGroups = await this.groupsModel.find();
    return allGroups;
  }

  async getGroupById(request: Request) {
    const groupInfo = await this.groupsModel.findOne({ groupId: request.body.id });
    return groupInfo;
  }

  async getGroupMembersInfo(request: Request) {
    const { membersId } = await this.groupsModel.findOne({ groupId: request.body.id });
    if (membersId) {
      const userData = await this.usersModel.find({ userId: { $in: membersId } }, {
        name: true,
        _id: false,
        avatar: true,
        login: true
      });
      throw new HttpException(userData, 200);
    } else {
      throw new HttpException({ errorMessage: "Ничего не найдено." }, 500);
    }
  }

  async createNewGroup(request: Request) {
    const newGroup = request.body;
    const createdGroup = await this.groupsModel.create(newGroup);

    if (createdGroup) {
      return createdGroup;
    } else {
      throw new HttpException({ errorMessage: "Пожалуйста попробуйте снова." }, 500);
    }
  }
}

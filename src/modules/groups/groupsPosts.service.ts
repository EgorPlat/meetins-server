import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { Group, GroupsDocument } from 'src/schemas/groups.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { IGroupPost } from 'src/interfaces/group.interface';

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
    const groupId = await this.groupsModel.findOne({ groupId: request.body.id });
    if (groupId?.membersId) {
      const userData = await this.usersModel.find({ userId: { $in: groupId?.membersId } }, {
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
    const { userId } = this.jwtHelpService.decodeJwt(request);
    const groupCandidate = {
      groupId: 1,
      name: newGroup.name,
      description: newGroup.description,
      membersId: userId,
      creatorId: userId
    }
    const createdGroup = await this.groupsModel.create(newGroup);

    if (createdGroup) {
      return createdGroup;
    } else {
      throw new HttpException({ errorMessage: "Пожалуйста попробуйте снова." }, 500);
    }
  }

  async createNewPostInGroup(files: any, request: Request) {
    const filesForPost = files.map(el => {
      return {
        src: el.filename,
        type: el.mimetype
      }
    });
    const newPost: IGroupPost = {
      id: Math.floor(Math.random()*100000),
      title: request.body.name,
      description: request.body.description,
      date: Date.now(),
      likes: 1,
      views: 1,
      comments: [],
      files: filesForPost
    }
    const updatedGroup = await this.groupsModel.updateOne({ groupId: request.body.groupId }, {$push: {
      posts: newPost
    }});
    if (newPost) {
      return newPost;
    } else {
      throw new HttpException({ errorMessage: "Пожалуйста попробуйте снова." }, 500);
    }
  }

  async createNewTalkInGroup(request: Request) {
    const { talkData } = request.body;

    const updatedGroup = await this.groupsModel.updateOne({ groupId: talkData.groupId }, {$push: {
      talks: {
        id: Math.floor(Math.random()*1000000),
        title: talkData.title,
        dateOfCreation: new Date(),
        messages: []
      }
    }});

    if (updatedGroup) {
      return true;
    } else {
      throw new HttpException({ errorMessage: "Внутренняя ошибка сервера." }, 500);
    }
  }
}

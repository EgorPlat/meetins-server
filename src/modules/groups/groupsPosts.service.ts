import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { Group, GroupsDocument } from 'src/schemas/groups.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { IGroup, IGroupPost } from 'src/interfaces/group.interface';

@Injectable()
export class GroupsService {
  constructor(
    private jwtHelpService: HelpJwtService,
    @InjectModel(Group.name) private groupsModel: Model<GroupsDocument>,
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}
    
  async getAllGroups(request: Request) {
    const { userId } = this.jwtHelpService.decodeJwt(request);
    const inithiator = await this.usersModel.findOne({ userId: userId }, { isFilter: true, interests: true });
    let groupList = [];
    if (!inithiator.isFilter) {
      groupList = await this.groupsModel.find();
    } else {
      groupList = await this.groupsModel.find({ interestsId: { $elemMatch: { $in: inithiator.interests } } });
    }
    return groupList;
  }

  async getGroupById(request: Request) {
    const groupInfo = await this.groupsModel.findOne({ groupId: request.body.id });
    return groupInfo;
  }

  async joinToGroup(request: Request) {
    const { userId } = this.jwtHelpService.decodeJwt(request);
    const groupInfo = await this.groupsModel.findOneAndUpdate({ groupId: request.body.groupId }, {
      $push: { membersId: userId }
    }, {returnDocument: 'after'});
    return groupInfo;
  }

  async manageGroupByid(file: any, request: Request) {
    const updatedGroup = await this.groupsModel.findOneAndUpdate({ groupId: request.body.groupId }, { $set: {
      headAvatar: file.filename,
      name: request.body.name,
      description: request.body.description
    }}, { returnDocument: 'after' });
    return updatedGroup;
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
      groupId: Math.floor(Math.random()*1000000),
      name: newGroup.name,
      description: newGroup.description,
      membersId: [userId],
      creatorId: userId,
      interestsId: newGroup.interestsId
    }
    const createdGroup = await this.groupsModel.create(groupCandidate);
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
      likes: [],
      views: 1,
      comments: [],
      files: filesForPost
    }
    const updatedGroup = await this.groupsModel.findOneAndUpdate({ groupId: request.body.groupId }, {$push: {
      posts: newPost
    }}, { returnDocument: 'after' });

    if (updatedGroup) {
      return updatedGroup;
    } else {
      throw new HttpException({ errorMessage: "Пожалуйста попробуйте снова." }, 500);
    }
  }

  async createNewTalkInGroup(request: Request) {
    const { title, groupId } = request.body;

    const newTalk = {
      id: Math.floor(Math.random()*1000000),
      title: title,
      dateOfCreation: new Date(),
      messages: []
    };

    const updatedGroup = await this.groupsModel.findOneAndUpdate({ groupId: groupId }, {$push: {
      talks: newTalk
    }}, {returnDocument: "after"});

    if (updatedGroup) {
      return updatedGroup;
    } else {
      throw new HttpException({ errorMessage: "Внутренняя ошибка сервера." }, 500);
    }
  }

  async addNewMessageInGroupTalk(request: Request) {
    const { groupId, talkId, text, userId } = request.body;

    const findedGroup = await this.groupsModel.find({ groupId: groupId });

    if (findedGroup) {
      return findedGroup[0].talks.filter(el => el.id === talkId)[0].messages;
    } else {
      throw new HttpException({ errorMessage: "Внутренняя ошибка сервера." }, 500);
    }
  }

  async getGroupTalksList(request: Request) {
    const { groupId } = request.body;

    const findedTalks = await this.groupsModel.find({ groupId: groupId }, {
      talks: true
    })

    if (findedTalks) {
      return findedTalks[0]?.talks;
    } else {
      throw new HttpException({ errorMessage: "Внутренняя ошибка сервера." }, 500);
    }
  }

  async createNewMessageInGroupTalk(request: Request) {
    const { groupId, talkId, text } = request.body;
    const { userId } = this.jwtHelpService.decodeJwt(request);

    const message = { userId: userId, date: new Date(), text: text }

    const findedGroup = await this.groupsModel.updateOne(
      { "talks.id": talkId, groupId: groupId },
      { 
        $push: { 
          "talks.$.messages": message 
        } 
      }
    );

    if (findedGroup) {
      return message;
    } else {
      throw new HttpException({ errorMessage: "Внутренняя ошибка сервера." }, 500);
    }
  }

  async getTalkMessagesInGroupById(request: Request) {
    const { groupId, talkId } = request.body;

    const findedGroup = await this.groupsModel.findOne(
      { "talks.id": talkId, groupId: groupId },
    );

    if (findedGroup) {
      return findedGroup.talks.filter(talk => talk.id === talkId)[0]?.messages;
    } else {
      throw new HttpException({ errorMessage: "Внутренняя ошибка сервера." }, 500);
    }
  }

  async addNewCommentIntoPost(request: Request, groupId: number, postId: number) {
    const { userId } = this.jwtHelpService.decodeJwt(request);
    const inithiator = await this.usersModel.findOne({ userId: userId }, { avatar: true });
    const date = new Date();

    const newComment = {
      userId: userId,
      date: date,
      avatar: inithiator.avatar,
      text: request.body.text
    }

    const updatedGroup = await this.groupsModel.findOneAndUpdate({ groupId: +groupId, "posts.id": +postId }, {
      $push: { "posts.$.comments": newComment }
    }, {returnDocument: 'after'})

    return updatedGroup;
  }


  async likePostInGroup(request: any, groupId: string, postId: string) {
    const decodedToken = this.jwtHelpService.decodeJwt(request);
    const updatedGroup = this.groupsModel.findOneAndUpdate({ groupId: +groupId, "posts.id": +postId }, {
        $addToSet: { "posts.$.likes": decodedToken.userId }
    }, { returnDocument: "after" });

    if (updatedGroup) return updatedGroup;
    throw new HttpException({ message: "Попробуйте снова, произошла неизвестная ошибка"}, 400);
  } 

  async unlikePostInGroup(request: any, groupId: string, postId: string) {
    const decodedToken = this.jwtHelpService.decodeJwt(request);
    const updatedUser = this.groupsModel.findOneAndUpdate({ groupId: +groupId, "posts.id": +postId }, {
        $pull: { "posts.$.likes": decodedToken.userId }
    }, { returnDocument: "after" });

    if (updatedUser) return updatedUser;
    throw new HttpException({ message: "Попробуйте снова, произошла неизвестная ошибка"}, 400);
  } 
}

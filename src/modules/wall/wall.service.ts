import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Group, GroupsDocument } from 'src/schemas/groups.schema';

@Injectable()
export class WallService {

  constructor(
    private jwtHelpService: HelpJwtService,
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    @InjectModel(Group.name) private groupsModel: Model<GroupsDocument>,
  ) {}

  async getCurrentWall(request: Request) {
    const { userId } = this.jwtHelpService.decodeJwt(request);
    const inithiator = await this.usersModel.findOne({ userId: userId });

    let usersPosts = [];
    let groupsPosts = [];

    if (inithiator.isFilter) {
      usersPosts = await this.usersModel.aggregate([
        { $match: { "posts": { $exists: true, $not: { $size: 0 } }} },
        { $match: { interests: { $elemMatch: { $in: inithiator.interests } } }},
        { $unwind: "$posts" },
        { $project: { post: "$posts", _id: 0, name: 1, avatar: 1, linkId: "$login" }}
      ]);
      groupsPosts = await this.groupsModel.aggregate([
        { $match: { "posts": { $exists: true, $not: { $size: 0 } }} },
        { $match: { interestsId: { $elemMatch: { $in: inithiator.interests } } }},
        { $unwind: "$posts" },
        { $project: { post: "$posts", _id: 0, name: 1, avatar: "$mainAvatar", linkId: "$groupId" }}
      ]);
    } else {
      usersPosts = await this.usersModel.aggregate([
        { $match: { "posts": { $exists: true, $not: { $size: 0 } }} },
        { $unwind: "$posts" },
        { $project: { post: "$posts", _id: 0, name: 1, avatar: 1, linkId: "$login" }}
      ]);
      groupsPosts = await this.groupsModel.aggregate([
        { $match: { "posts": { $exists: true, $not: { $size: 0 } }} },
        { $unwind: "$posts" },
        { $project: { post: "$posts", _id: 0, name: 1, avatar: "$mainAvatar", linkId: "$groupId" }}
      ]);
    }

    usersPosts = usersPosts.map(el => { return {...el, isGroup: false} });
    groupsPosts = groupsPosts.map(el => { return {...el, isGroup: true} });

    return [...usersPosts, ...groupsPosts].map(el => {
      return {
        postTitle: el.post.title,
        postDescription: el.post.description,
        postDate: el.post.date,
        postLikes: el.post.likes,
        postFiles: el.post.files,
        name: el.name,
        avatar: el.avatar,
        isGroup: el.isGroup,
        linkId: el.linkId
      }
    });
  };

}

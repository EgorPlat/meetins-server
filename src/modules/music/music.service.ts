import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { MusicAuthor, MusicAuthorDocument } from 'src/schemas/musicAuthor.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class MusicService {

  constructor(
    private jwtHelpService: HelpJwtService,
    @InjectModel(MusicAuthor.name) private musicAuthorModel: Model<MusicAuthorDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async getAllMusic() {
    const authors = await this.musicAuthorModel.find({});
    return authors;
  };

  async getAuthorsStatistics() {
    const authors = await this.musicAuthorModel.aggregate([
      {
        $unwind: "$compositions"
      },
      {
        $group: {
            _id: "$authorId",
            playsNumber: { $sum: "$compositions.playsNumber" },
            name: { $first: "$name" }
        }
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          playsNumber: 1,
          name: 1
        }
      }
    ])
    return authors;
  };

  async getAuthorStatistics(request: Request) {
    const { userId } = this.jwtHelpService.decodeJwt(request);
    const statistic = await this.musicAuthorModel.aggregate([
      { $match: { authorId: userId } },
      {
        $unwind: "$compositions"
      },
      {
        $project: {
          _id: false,
          author: "$name",
          title: "$compositions.title",
          playsNumber: "$compositions.playsNumber",
          image: "$compositions.imageSrc"
        }
      }
    ]);
    if (statistic) {
      return statistic;
    } else {
      throw new HttpException({ errorMessage: "Вы еще не публиковали музыку." }, 400 );
    }
  }

  async addMusic(files: any[], request: Request) {
    const { userId } = this.jwtHelpService.decodeJwt(request);
    const findedAuthor = await this.musicAuthorModel.findOne({ authorId: userId });
    let imageSrc = "";
    let audioSrc = "";

    files.map(file => {
      if (file.mimetype.includes('image')) imageSrc = file.filename;
      if (file.mimetype.includes('audio')) audioSrc = file.filename;
    });

    const newComposition = {
      audioSrc: audioSrc,
      imageSrc: imageSrc,
      title: request.body.title,
      description: request.body.description,
      playsNumber: 0,
      id: Math.floor(Math.random()*1000000)
    };

    if (findedAuthor) {
      await this.musicAuthorModel.updateOne({ authorId: userId }, {
        $set: {
          compositions: [...findedAuthor.compositions, newComposition]
        }
      });
    } else {
      await this.musicAuthorModel.create({
        authorId: userId,
        name: request.body.name,
        compositions: [newComposition]
      });
    }
  }

  async addPlaysNumber(request: Request, authorId: string, trackId: string) {
    const data = await this.musicAuthorModel.findOneAndUpdate(
      { authorId: authorId, "compositions.id": +trackId }, 
      {
        $inc: { "compositions.$.playsNumber": 1 }
      }, 
      {returnDocument: "after"}
    );
    return data;
  }

  async getMatchesList(request: Request) {
    const { userId } = this.jwtHelpService.decodeJwt(request);
    
    const data = await this.userModel.aggregate([
      { $limit: 4 },
      { 
        $project: {
          name: 1,
          login: 1,
          avatar: 1
        } 
      }
    ]);
    return data;
  }

  async getAuthorCurrentName(request: Request) {
    const { userId } = this.jwtHelpService.decodeJwt(request);
    const authorData = await this.musicAuthorModel.findOne({ authorId: userId }, { name: 1 });

    if (authorData) {
      return authorData.name;
    } else {
      return "";
    }
  }

}

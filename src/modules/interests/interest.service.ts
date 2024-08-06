import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Interest, InterestDocument } from 'src/schemas/interests.schema';
import { UserService } from 'src/modules/users/users.service';
import { Model } from 'mongoose';

@Injectable()
export class InterestsService {

    constructor(
        private jwtService: JwtService, 
        private userService: UserService,
        @InjectModel(Interest.name) private interestsModel: Model<InterestDocument>
    ) {}
    
    async getInterests(request: Request) {
        const allInterests = await this.interestsModel.find();
        if (allInterests) {
            return allInterests;
        } else {
            throw new HttpException('Ничего не найдено.', 400);
        }
    }

    async getInterestsById(request: Request) {
        let findedInterests = [];
        const { interests } = request.body;

        if (interests) {
            await Promise.all(interests.map(async (el) => {
                const eachInterest = await this.interestsModel.findOne({ interestId: el});
                if (eachInterest) {
                    findedInterests = [...findedInterests, eachInterest];
                }
            }));
        }

        if (findedInterests) {
            return findedInterests;
        }
    }

    async addInterests(request: Request) {
        const { title } = request.body;
        const newId = Math.floor(Math.random()*500000);

        const newInterest = {
            title: title,
            interestId: newId
        };

        const interest = await this.interestsModel.create(newInterest);
        if(interest) { 
            return interest;
        }
    }
}

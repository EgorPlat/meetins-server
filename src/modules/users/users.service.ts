import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { Model } from 'mongoose';
import { CreateUserDto } from "src/dto/create-user.dto";
import { IPeople } from "src/interfaces/people.interface";
import { ISortParams } from "src/interfaces/sort.params";
import { IAccount } from "src/interfaces/account.interface";
import { IProfile } from "src/interfaces/profile.interface";
import { HelpJwtService } from "src/help/token.service";
import { Request } from 'express';
import { Post } from "src/interfaces/post.interface";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>, 
        private helpJwtService: HelpJwtService
    ){}

    async updateUsersData() {
        await this.userModel.updateMany({}, { $set: { tag: { color: "rgba(42, 132, 251, 0.878)", title: "Гость" } } });
        await this.userModel.updateMany({}, { $set: { purchasedOpportunities: [] } });
    };

    async getUsers() {
        const users = await this.userModel.find({}, {
            password: false,
            _id: false,
            __v: false
        });
        return users;
    };

    async addUser(dto: CreateUserDto) {
        let candidate = {
            ...dto, 
            login: Math.floor(Math.random()*20000),
            userId: "id" + String(Math.floor(Math.random()*100000))
        }
        const user = await this.userModel.create(candidate);
        if(user) { 
            return user;
        }
    };

    async getUserByLogin(login: string) {
        const user = await this.userModel.findOne({login: login}, {
            password: false,
            _id: false,
            __v: false
        })
        return user;
    };

    async getUserByLoginMainInfoOnly(login: string) {
        const user = await this.userModel.findOne({login: login}, {
            password: false,
            _id: false,
            __v: false,
            innerInvites: false,
            outerInvites: false,
            isFilter: false,
            markedUsers: false,
            purchasedOpportunities: false
        })
        return user;
    };

    async getUserList() {
        const user = await this.userModel.find({}, {
            password: false,
            _id: false,
            __v: false
        })
        const peoples: IPeople[] = user.map(user => {
            return {
                email: user.email,
                login: user.login,
                userName: user.name,
                userAvatar: user.avatar,
                status: user.status,
                age: user.age,
                city: user.city,
                gender: user.gender,
                tag: user.tag
            }
        })
        return peoples;
    };

    async addUserIntoMarkedList(request: Request) {
        const { userId } = this.helpJwtService.decodeJwt(request);
        const { neededUserId } = request.body;

        const updatedUser = this.userModel.findOneAndUpdate({ userId: userId }, { $push: {
            markedUsers: neededUserId
        }}, { returnDocument: 'after' });

        if (updatedUser) return updatedUser;
        throw new HttpException({ errorMessage: "Что-то пошло не так."}, 400);
    };

    async formMarkedUsersInfoByIds(userId: string) {
        const usersInfo = await this.userModel.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $unwind: "$markedUsers"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "markedUsers",
                    foreignField: "userId",
                    as: "markedUserInfo"
                }
            },
            {
                $unwind: "$markedUserInfo"
            },
            {
                $project: {
                    _id: false,
                    "markedUserInfo.name": true,
                    "markedUserInfo.avatar": true,
                    "markedUserInfo.login": true,
                    "markedUserInfo.userId": true
                }
            }
        ]);
        if (usersInfo) return usersInfo.map(el => { return el.markedUserInfo });
    };

    async updateUserTag(request: Request) {
        const { userId } = this.helpJwtService.decodeJwt(request);
        const { title, color } = request.body;

        const updatedUser = await this.userModel.findOneAndUpdate({ userId: userId }, {
            $set: { tag: { title, color } }
        }, { returnDocument: 'after' });

        if (updatedUser) return updatedUser;    
        throw new HttpException({ errorMessage: "Что-то пошло не так."}, 400);
    };


    async getMarkedUsersInfo(request: Request) {
        const { userId } = this.helpJwtService.decodeJwt(request);

        const markedUsersInfo = await this.formMarkedUsersInfoByIds(userId);
        if (markedUsersInfo) {
            return markedUsersInfo;
        }
        throw new HttpException({ errorMessage: "Что-то пошло не так."}, 400);
    };

    async removeUserFromMarkedList(request: Request, removedUserId: string) {
        const { userId } = this.helpJwtService.decodeJwt(request);

        await this.userModel.updateOne({ userId: userId }, { $pull: {
            markedUsers: removedUserId
        }});
        const markedUsersInfo = await this.formMarkedUsersInfoByIds(userId);
        if (markedUsersInfo) {
            return markedUsersInfo;
        }
        throw new HttpException({ errorMessage: "Что-то пошло не так."}, 400);
    };

    async getUserListByPageNumber(request: Request) {
        const { userId } = this.helpJwtService.decodeJwt(request);
        const inithiator = await this.userModel.findOne({ userId: userId });
        const { pageNumber, pageSize, filters } = request.body;

        let users = [];
        if (inithiator.isFilter) {
            users = await this.userModel.find({ interests: { $elemMatch: { $in: inithiator.interests } } }, {
                password: false,
                _id: false,
                __v: false
            });
        } else {
            if (filters.event) {
                users = await this.userModel.find({ 
                    events: { $elemMatch: { $eq: String(filters.event) } }
                }, {
                    password: false,
                    _id: false,
                    __v: false
                });
            } else {
                users = await this.userModel.find({}, {
                    password: false,
                    _id: false,
                    __v: false
                });
            }
        }
        let peoples: IPeople[] = users.map((user, index) => {
            return {
                email: user.email,
                login: user.login,
                userName: user.name,
                userAvatar: user.avatar,
                status: user.status,
                age: user.age,
                city: user.city,
                gender: user.gender,
                tag: user.tag
            }
        });
        if (filters.age !== 0) {
            peoples = peoples.filter(peoples => peoples.age === filters.age);
        }
        if (filters.gender !== 'all') {
            peoples = peoples.filter(peoples => peoples.gender === filters.gender)
        }
        const maxPage = Math.ceil(peoples.length / pageSize);
        peoples = peoples.slice(pageNumber * pageSize - pageSize, pageNumber * pageSize);

        return { data: peoples, maxPage: maxPage };
    };

    async getSortedPeoples(sortParams: ISortParams) {
        let peoples = await this.getUserList();
        if(sortParams.age !== 50) {
            peoples = peoples.filter((user) => user.age == sortParams.age);
        }
        if(sortParams.gender !== "") {
            peoples = peoples.filter((user) => user.gender == sortParams.gender);;
        }
        throw new HttpException(peoples, 200);
    };

    async getUpdatedUserByEmail(email: string) {
        const user = await this.userModel.findOne({email: email}, {
            password: false,
            _id: false,
            __v: false
        });
        return user;
    };

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({email: email}, {
            _id: false,
            __v: false
        });
        return user;
    };

    async getUserByUserId(userId: string) {
        const user = await this.userModel.findOne({userId: userId}, {
            _id: false,
            __v: false
        });
        return user;
    };

    async updateUserStatus(decodedToken: any, status: string) {

        const updatedUser: User = await this.userModel.findOneAndUpdate(
            {email : decodedToken.email}, 
            {$set: {status : status}}, 
            { returnDocument: 'after' }
        );
        if(updatedUser) { 
            return updatedUser;
        }
    };

    async updateUserFilterStatus(decodedToken: any, filterStatus: string) {
        const updatedUser = await this.userModel.findOneAndUpdate(
            {userId : decodedToken.userId}, {$set: {isFilter : filterStatus}}, { returnDocument: 'after' }
        );
        return updatedUser;
    };

    async updateUserAccount(decodedToken: any, accountData: IAccount) {

        const users = await this.userModel.find({
            $or: [
                { email: accountData.email },
                { login: accountData.login }
            ]
        });

        if (users.length === 0) {
            await this.userModel.updateOne({email : decodedToken.email}, {$set: {
                email : accountData.email, 
                password: accountData.password,
                login: accountData.login
            }});
    
            const updatedUser: User = await this.getUpdatedUserByEmail(decodedToken.email);
            if(updatedUser) { 
                return updatedUser;
            }
        } else {
            throw new HttpException({ message: "Занят login или email"}, 400);
        }
    };

    async updateUserProfile(decodedToken: any, accountData: IProfile) {

        const users = await this.userModel.find({ email: accountData.phoneNumber });

        if (users.length === 0) {
            await this.userModel.findOneAndUpdate({email : decodedToken.email}, {$set: {
                phoneNumber : accountData.phoneNumber, 
                name: accountData.name,
                birthDate: accountData.birthDate,
            }});
            
            const updatedUser: User = await this.updateUserBirthDate(decodedToken.email, new Date(accountData.birthDate));
    
            if(updatedUser) { 
                return updatedUser;
            }
        } else {
            throw new HttpException({ message: "Занят login или email"}, 400);
        }
    };

    async updateUserAvatar(file: any, user: User) {

        const updatedUser: User = await this.userModel.findOneAndUpdate({email : user.email}, {$set: {
            avatar : file.filename, 
        }}, { returnDocument: "after" });

        if(updatedUser) { 
            return updatedUser;
        } 
    };

    async updateUserBirthDate(userEmail: string, date: Date) {
        const actualYear = new Date().getFullYear();
        const userBirthDateYear = date.getFullYear();

        const updatedUser: User = await this.userModel.findOneAndUpdate({email : userEmail}, {$set: {
            age: actualYear - userBirthDateYear, 
        }}, { returnDocument: "after" });

        return updatedUser;
    };

    async addUserEvent(request: Request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const prevUserState = await this.userModel.findOne({email : decodedToken.email});
        
        if (!prevUserState.events.includes(body.eventId)) {
            const updatedUser: User = await this.userModel.findOneAndUpdate({email : decodedToken.email}, {$set: {
                events: [...prevUserState.events, body.eventId], 
            }}, { returnDocument: "after" });
            if (updatedUser) {
                return updatedUser;
            }
        } else {
            throw new HttpException({ message: "Данное событие уже добавлено" }, 400);
        }
    };

    async deleteUserEvent(request: Request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const prevUserState = await this.userModel.findOne({email : decodedToken.email});
        
        const updatedUser: User = await this.userModel.findOneAndUpdate(
            {email : decodedToken.email}, {
                $set: {
                    events: prevUserState.events.filter(el => el !== body.eventId), 
                }
            },
            { returnDocument: "after" }
        );
        if (updatedUser) {
            return updatedUser;
        }
    };

    async updateUserInterest(request: Request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        
        const updatedUser: User = await this.userModel.findOneAndUpdate(
            {email : decodedToken.email}, {
                $set: {
                    interests: body.interests,
                }
            }, 
            { returnDocument: "after" }
        ); 
        if (updatedUser) {
            return updatedUser;
        }
    };

    async removeUserInterest(request: Request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const prevUserState = await this.userModel.findOne({email : decodedToken.email});
        
        await this.userModel.updateOne({email : decodedToken.email}, {$set: {
            interests: prevUserState?.interests.filter(el => el !== body.interestId), 
        }}); 
        const updatedUser: User = await this.getUpdatedUserByEmail(decodedToken.email);
        if (updatedUser) {
            return updatedUser;
        }
    };

    async addUserPost(files: any, request: Request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);

        const newPost: Post = {
            id: String(Math.floor(Math.random()*150000)),
            title: body.title,
            description: body.description,
            files: files.map(el => {
                return {
                  src: el.filename,
                  type: el.mimetype
                }
            }),
            date: String(new Date()),
            likes: [],
        };
        
        const updatedUser = await this.userModel.findOneAndUpdate({email : decodedToken.email}, {$push: {
            posts: newPost
        }}, {returnDocument: "after"});

        if (updatedUser) {
            throw new HttpException(updatedUser, 200);
        } else {
            throw new HttpException({ message: "Попробуйте снова, произошла неизвестная ошибка"}, 400);
        }
    };

    async addLikeToUserPost(request: Request, postId: string, userId: string) {
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const updatedUser = this.userModel.findOneAndUpdate({ userId: userId, "posts.id": postId }, {
            $addToSet: { "posts.$.likes": decodedToken.userId }
        }, { returnDocument: "after" });

        if (updatedUser) return updatedUser;
        throw new HttpException({ message: "Попробуйте снова, произошла неизвестная ошибка"}, 400);
    };

    async removeLikeFromUserPost(request: Request, postId: string, userId: string) {
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const updatedUser = this.userModel.findOneAndUpdate({ userId: userId, "posts.id": postId }, {
            $pull: { "posts.$.likes": decodedToken.userId }
        }, { returnDocument: "after" });

        if (updatedUser) return updatedUser;
        throw new HttpException({ message: "Попробуйте снова, произошла неизвестная ошибка"}, 400);
    };
}
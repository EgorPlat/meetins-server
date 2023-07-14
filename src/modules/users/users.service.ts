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

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private helpJwtService: HelpJwtService){}

    async updateUsersData() {
        await this.userModel.updateMany({}, { $set: { tag: { color: "rgba(42, 132, 251, 0.878)", title: "Гость" } } });
        await this.userModel.updateMany({}, { $set: { purchasedOpportunities: [] } });
    }
    async getUsers() {
        const users = await this.userModel.find({}, {
            password: false,
            _id: false,
            __v: false
        });
        return users;
    }

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
    }
    async getUserByLogin(login: string) {
        const user = await this.userModel.findOne({login: login}, {
            password: false,
            _id: false,
            __v: false
        })
        return user;
    }
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
                gender: user.gender
            }
        })
        return peoples;
    }
    async getUserListByPageNumber(request: Request) {
        const { pageNumber, pageSize, filters } = request.body;

        const users = await this.userModel.find({}, {
            password: false,
            _id: false,
            __v: false
        });
        let peoples: IPeople[] = users.map((user, index) => {
            return {
                email: user.email,
                login: user.login,
                userName: user.name,
                userAvatar: user.avatar,
                status: user.status,
                age: user.age,
                city: user.city,
                gender: user.gender
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

        return { peoples: peoples, maxPage: maxPage };
    }
    async getSortedPeoples(sortParams: ISortParams) {
        let peoples = await this.getUserList();
        if(sortParams.age !== 50) {
            peoples = peoples.filter((user) => user.age == sortParams.age);
        }
        if(sortParams.gender !== "") {
            peoples = peoples.filter((user) => user.gender == sortParams.gender);;
        }
        throw new HttpException(peoples, 200);
    }
    async getUpdatedUserByEmail(email: string) {
        const user = await this.userModel.findOne({email: email}, {
            password: false,
            _id: false,
            __v: false
        });
        return user;
    }
    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({email: email}, {
            _id: false,
            __v: false
        });
        return user;
    }
    async getUserByUserId(userId: string) {
        const user = await this.userModel.findOne({userId: userId}, {
            _id: false,
            __v: false
        });
        return user;
    }
    async updateUserStatus(decodedToken: any, status: string) {

        await this.userModel.updateOne({email : decodedToken.email}, {$set: {status : status}});

        const updatedUser: User = await this.getUpdatedUserByEmail(decodedToken.email);
        if(updatedUser) { 
            return updatedUser;
        }
    }
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
    }
    async updateUserProfile(decodedToken: any, accountData: IProfile) {

        const users = await this.userModel.find({ email: accountData.phoneNumber });

        if (users.length === 0) {
            await this.userModel.updateOne({email : decodedToken.email}, {$set: {
                phoneNumber : accountData.phoneNumber, 
                name: accountData.name,
                birthDate: accountData.birthDate
            }});
            
            await this.updateUserBirthDate(decodedToken.email, new Date(accountData.birthDate));
    
            const updatedUser: User = await this.getUpdatedUserByEmail(decodedToken.email);
            if(updatedUser) { 
                return updatedUser;
            }
        } else {
            throw new HttpException({ message: "Занят login или email"}, 400);
        }
    }
    async updateUserAvatar(file: any, user: User) {

        await this.userModel.updateOne({email : user.email}, {$set: {
            avatar : file.filename, 
        }});

        const updatedUser: User = await this.getUpdatedUserByEmail(user.email);
        if(updatedUser) { 
            return updatedUser;
        } 
    }
    async updateUserBirthDate(userEmail: string, date: Date) {
        const actualYear = new Date().getFullYear();
        const userBirthDateYear = date.getFullYear();

        await this.userModel.updateOne({email : userEmail}, {$set: {
            age: actualYear - userBirthDateYear, 
        }});
    }

    async addUserEvent(request: Request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const prevUserState = await this.userModel.findOne({email : decodedToken.email});
        
        if (!prevUserState.events.includes(body.eventId)) {
            await this.userModel.updateOne({email : decodedToken.email}, {$set: {
                events: [...prevUserState.events, body.eventId], 
            }});
            const updatedUser: User = await this.getUpdatedUserByEmail(decodedToken.email);
            if (updatedUser) {
                return updatedUser;
            }
        } else {
            throw new HttpException({ message: "Данное событие уже добавлено" }, 400);
        }
    }

    async deleteUserEvent(request: Request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const prevUserState = await this.userModel.findOne({email : decodedToken.email});
        
        await this.userModel.updateOne({email : decodedToken.email}, {$set: {
            events: prevUserState.events.filter(el => el !== body.eventId), 
        }});
        const updatedUser: User = await this.getUpdatedUserByEmail(decodedToken.email);
        if (updatedUser) {
            return updatedUser;
        }
    }

    async updateUserInterest(request: Request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const prevUserState = await this.userModel.findOne({email : decodedToken.email});
        
        await this.userModel.updateOne({email : decodedToken.email}, {$set: {
            interests: body.interests,
        }}); 
        const updatedUser: User = await this.getUpdatedUserByEmail(decodedToken.email);
        if (updatedUser) {
            return updatedUser;
        }
    }
    async removeUserInterest(request: any) {
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
    }

    async addUserPost(file: any, request: Request) {
        const { body } = request;
        const decodedToken = this.helpJwtService.decodeJwt(request);
        const user = await this.userModel.findOne({email : decodedToken.email});

        const newPost: Post = {
            id: String(Math.floor(Math.random()*150000)),
            title: body.title,
            description: body.description,
            images: [file.filename],
            date: String(new Date()),
            likes: 0,
        }
        await this.userModel.updateOne({email : decodedToken.email}, {$set: {
            posts: [...user.posts, newPost]
        }});
        const updatedUser: User = await this.getUpdatedUserByEmail(decodedToken.email);

        if (updatedUser) {
            throw new HttpException(updatedUser, 200);
        } else {
            throw new HttpException({ message: "Попробуйте снова, произошла неизвестная ошибка"}, 400);
        }
    }
}
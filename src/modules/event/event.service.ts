import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IEventsInfo } from 'src/interfaces/events.interface';
import { CheckService } from 'src/help/ckeck.service';
import { lastValueFrom }  from 'rxjs';
import { Request } from 'express';
import { HelpJwtService } from 'src/help/token.service';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/modules/users/users.service';
import { IOuterInvites } from 'src/interfaces/sentInvites.interface';
import { MailService } from 'src/modules/mail/mail.service';

@Injectable()
export class EventService {

    constructor(
        private httpService: HttpService,
        private checkService: CheckService,
        private jwtHelpService: HelpJwtService,
        private userService: UserService,
        private mailService: MailService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async getUserOuterInvitesEventInfo(request: Request) {
        const decodedJwt = this.jwtHelpService.decodeJwt(request);
        const user = await this.userService.getUserByEmail(decodedJwt.email);
        let userEventsInfo = [];
        if (user) {
            await Promise.all(user.outerInvites.map(async (inviteInfo) => {
                const {data} = await this.httpService.get(
                    `https://kudago.com/public-api/v1.4/events/${inviteInfo.eventId}`
                ).toPromise();
                const neededUsersId = inviteInfo.invitedUsers.map(el => el.userId);
                const invitedUsers = await this.userModel.find({userId: { $in: neededUsersId}}, { name: 1, avatar: 1, login: 1});
                if (data) {
                    return { 
                        ...data, 
                        isInnerInvite: false, 
                        inviteInfo: {
                            ...inviteInfo,
                            invitedUsers: invitedUsers.map(el => {
                                return { avatar: el.avatar, name: el.name, login: el.login }
                            })
                        } 
                    };
                } else {
                    return null;
                }
            })).then(results => {
                userEventsInfo = results.filter(el => el !== null);
            });
        }
        throw new HttpException(userEventsInfo, 200);
    }
    async getUserInnerInvitesEventInfo(request: Request) {
        const decodedJwt = this.jwtHelpService.decodeJwt(request);
        const user = await this.userModel.findOne({email: decodedJwt.email}, {
            _id: false,
            __v: false
        });
        let userEventsInfo = [];
        if (user) {
            await Promise.all(user.innerInvites.map(async (inviteInfo) => {
                const {data} = await this.httpService.get(
                    `https://kudago.com/public-api/v1.4/events/${inviteInfo.eventId}`
                ).toPromise();
                const inviteUser = await this.userModel.findOne({userId: inviteInfo.fromUserId}, { avatar: 1, login: 1, name: 1});
                if (data) {
                    return { 
                        ...data, 
                        isInnerInvite: true, 
                        inviteInfo: { 
                            ...inviteInfo,
                            avatar: inviteUser.avatar,
                            login: inviteUser.login,
                            name: inviteUser.name
                        } 
                    };
                } else {
                    return null;
                }
            })).then(results => {
                userEventsInfo = [...userEventsInfo, ...results.filter(el => el !== null)];
            })
        }
        throw new HttpException(userEventsInfo, 200);
    }

    async getUserEventsInfo(request: Request) {
        const decodedJwt = this.jwtHelpService.decodeJwt(request);
        const user = await this.userModel.findOne({email: decodedJwt.email}, {
            _id: false,
            __v: false
        });
        let userEventsInfo = [];
        if (user.events.length !== 0) {
            const { data } = await this.httpService.get(
                `https://kudago.com/public-api/v1.4/events/?ids=${user.events.join(',')}&fields=id,title,description,price,images,location,dates,age_restriction`
            ).toPromise();
            if (data) {
                userEventsInfo = data.results;
            } else {
                throw new HttpException({ errorMessage: "Не удалось получить информацию"}, 404);
            }
        } else {
            return [];
        }
        throw new HttpException(userEventsInfo, 200);
    }

    async getEventsByCategory(eventsInfo: IEventsInfo) {
        const dateInTimestamp: number = Math.floor(Date.now() / 1000);
        
        const {data} = await this.httpService.get(
            `https://kudago.com/public-api/v1.4/events/?page=${eventsInfo.page}&page_size=70&categories=${eventsInfo.nameCategory}&fields=id,title,description,price,images,location,dates,age_restriction&actual_since=${dateInTimestamp-50000}`
        ).toPromise();
        if(data) {
            /*let newData = [];
            await Promise.all( data.results.map( async (el) => 
                await lastValueFrom(this.httpService.head(`${el.images[0].image}`)).then(() => {
                    return el;
                }).catch(() => {
                    return null;
                })
            )).then(results => {
                newData = results.filter(res => res !== null);
            }).catch(() => {
                throw new HttpException('Ошибка сервера.', 500);
            })*/
            return data.results;
        } else {
            throw new HttpException('Ничего не найдено', 404);
        }
    }
    async getEventInfoById(eventId: string | number) {
        const {data} = await this.httpService.get(
            `https://kudago.com/public-api/v1.4/events/${eventId}`
        ).toPromise();
        if(data) {
            return data;
        } else {
            throw new HttpException('Ничего не найдено', 404);
        }
    }

    async getCommentsForEventById(eventId: string | number) {
        const {data} = await this.httpService.get(
            `https://kudago.com/public-api/v1.2/events/${eventId}/comments/`
        ).toPromise();
        if(data) {
            return data.results.slice(0, 30);
        } else {
            throw new HttpException('Ничего не найдено', 404);
        }
    }

    async sendInviteToUser(request: Request) {
        try {
            const decodedJwt = await this.jwtHelpService.decodeJwt(request);

            const { userIdTo, eventId } = request.body;
            const dateOfSending = new Date();
            
            const userFromData = await this.userService.getUserByEmail(decodedJwt.email);
            const userToData = await this.userService.getUserByUserId(userIdTo);

            await this.mailService.sendUserConfirmation(userToData.email, userToData.name);
            // добавление исходящего приглашения
            let eventSearched: boolean = false;
            let updatedOuterInvites = userFromData.outerInvites.map(el => {
                if (el.eventId === eventId) {
                    eventSearched =  true;
                    const userAlreadyInList = el.invitedUsers.filter(user => user.userId === userIdTo).length !== 0;
                    if (userAlreadyInList) {
                        throw new HttpException('User is already in invited list', 500)
                    } else {
                        return {
                            eventId: eventId,
                            invitedUsers: [...el.invitedUsers, 
                                { 
                                    userId: userIdTo, 
                                    status: false, 
                                    dateOfSending: dateOfSending,
                                    //avatar: userToData.avatar,
                                    //name: userToData.name,
                                    //login: userToData.login
                                }
                            ]
                        }
                    }
                } else {
                    return el;
                }
            })
            if (!eventSearched) {
                updatedOuterInvites = [...updatedOuterInvites, {
                    invitedUsers: [
                        { 
                            userId: userIdTo, 
                            status: false, 
                            dateOfSending: dateOfSending,
                            //avatar: userToData.avatar,
                            //name: userToData.name,
                            //login: userToData.login
                        }
                    ],
                    eventId: eventId
                }]
            }
            await this.userModel.updateOne({ userId: userFromData.userId } , { 
                $set: {
                    outerInvites: updatedOuterInvites
                }
            });

            // добавление входящего приглашения
            const innerInvite = {
                fromUserId: userFromData.userId,
                eventId: eventId,
                dateOfSending: dateOfSending,
                status: false,
                //name: userFromData.name,
                //avatar: userFromData.avatar,
                //login: userFromData.login
            }
            await this.userModel.updateOne({ userId: userIdTo }, { 
                $set: {
                    innerInvites: [...userToData.innerInvites, innerInvite]
                }
            })
            return { message: 'Success' };
        } catch(error) {
            throw new HttpException(error, 500)
        }
    }

    async declineInnerInvite(request: Request) {
        const { userId } = this.jwtHelpService.decodeJwt(request);
        const { senderId, eventId } = request.body;

        const updatedUser = await this.userModel.findOneAndUpdate({ userId: userId }, { 
            $pull: {
                innerInvites: { fromUserId: senderId, eventId: eventId }
            }
        })

        if(updatedUser) return eventId;
        throw new HttpException({ errorMessage: "Что-то пошло не так" }, 500)
    }
}

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
        const user = await this.userModel.findOne({email: decodedJwt.email}, {
            _id: false,
            __v: false
        });
        let userEventsInfo = [];
        if (user) {
            await Promise.all(user.outerInvites.map(async (inviteInfo) => {
                const {data} = await this.httpService.get(
                    `https://kudago.com/public-api/v1.4/events/${inviteInfo.eventId}`
                ).toPromise();
                if (data) {
                    return { ...data, isInnerInvite: false, inviteInfo };
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
                if (data) {
                    return { ...data, isInnerInvite: true, inviteInfo };
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
        if (user) {
            await Promise.all(user.events.map(async (eventId) => {
                const {data} = await this.httpService.get(
                    `https://kudago.com/public-api/v1.4/events/${eventId}`
                ).toPromise();
                if (data) {
                    return data;
                } else {
                    return null;
                }
            })).then(results => {
                userEventsInfo = results.filter(el => el !== null);
            })
        }
        throw new HttpException(userEventsInfo, 200);
    }

    async getEventsByCategory(eventsInfo: IEventsInfo) {
        const dateInTimestamp: number = Math.floor(Date.now() / 1000);
        
        const {data} = await this.httpService.get(
            `https://kudago.com/public-api/v1.4/events/?page=${eventsInfo.page}&page_size=70&categories=${eventsInfo.nameCategory}&fields=id,title,description,price,images,age_restriction&actual_since=${dateInTimestamp-50000}&actual_until=${dateInTimestamp}`
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
                        throw new HttpException('User is already in invited list', 200)
                    } else {
                        return {
                            eventId: eventId,
                            invitedUsers: [...el.invitedUsers, 
                                { 
                                    userId: userIdTo, 
                                    status: false, 
                                    dateOfSending: dateOfSending,
                                    avatar: userToData.avatar,
                                    name: userToData.name
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
                            avatar: userToData.avatar,
                            name: userToData.name
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
                name: userFromData.name,
                avatar: userFromData.avatar
            }
            await this.userModel.updateOne({ userId: userIdTo }, { 
                $set: {
                    innerInvites: [...userToData.innerInvites, innerInvite]
                }
            })

            throw new HttpException('Success', 200)
        } catch(error) {
            throw new HttpException(error, 500)
        }
    }
}

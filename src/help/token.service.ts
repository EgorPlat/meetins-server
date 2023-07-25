import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class HelpJwtService {
    constructor(private jwtService: JwtService) {}

    decodeJwt(request: Request) {
        //const BearerToken: any = request.headers.authorization;
        //const token = BearerToken.split(' ')[1];
        const token = request.cookies['access_token'];
        const decodedToken: any = this.jwtService.decode(token);

        return decodedToken;
    }
    decodeJwtFromString(token: string) {
        const decodedToken: any = this.jwtService.decode(token);
        return decodedToken;
    }
}
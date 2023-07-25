import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        try {
            const jwt = req.cookies['access_token'];
            
            if(!jwt) {
                res.clearCookie('access_token');
                throw new UnauthorizedException('Невалидный токен. Обновите.')
            }

            const user = this.jwtService.verify(/*token*/jwt);
            req.user = user;
            return true;
        }
        catch(e) {
            res.clearCookie('access_token');
            throw new UnauthorizedException('Невалидный токен. Обновите.')
        }
    }
}
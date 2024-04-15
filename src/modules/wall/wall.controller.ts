import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { WallService } from './wall.service';

@Controller('wall')
@ApiTags('Лента')
//@UseGuards(JwtAuthGuard)

export class WallController {

    constructor(private wallService: WallService) {}

    @Get()
    getAllMusic(@Req() request: Request) {
        return this.wallService.getCurrentWall(request);
    }

}

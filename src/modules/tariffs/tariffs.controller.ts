import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TariffsService } from './tariffs.service';
import { Request } from 'express';

@Controller('tariffs')
@ApiTags('Тарифы')
/*@UseGuards(JwtAuthGuard)*/
export class TariffsController {

    constructor(private tariffsService: TariffsService) {}

    @Post('/add-tariff')
    addTariff(@Req() request: Request) {
        return this.tariffsService.addTariff(request);
    }

    @Post('/add-tariffOppotunity')
    addTariffOppotunity(@Req() request: Request) {
        return this.tariffsService.addTariffOppotunity(request);
    }

    @Get('/getTariffsInfo')
    getTariffsInfo(@Req() request: Request) {
        return this.tariffsService.getTariffsInfo(request);
    }
}

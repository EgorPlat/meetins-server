import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { PaymentService } from './payment.service';

@Controller('payment')
@ApiTags('Оплата')
//@UseGuards(JwtAuthGuard)

export class PaymentController {

    constructor(private paymentService: PaymentService) {}

    @Post('/payment-tariff')
    paymentForTariffs(@Req() request: Request) {
        return this.paymentService.paymentForTariffs(request);
    }

}

import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class PaymentService {

  constructor() {}

  async paymentForTariffs(request: Request) {
    console.log(request.body)
  }

}

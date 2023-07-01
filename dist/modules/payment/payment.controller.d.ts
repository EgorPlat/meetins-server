import { Request } from 'express';
import { PaymentService } from './payment.service';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    paymentForTariffs(request: Request): Promise<void>;
}

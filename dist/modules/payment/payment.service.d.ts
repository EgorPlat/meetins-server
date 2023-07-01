import { Request } from 'express';
export declare class PaymentService {
    constructor();
    paymentForTariffs(request: Request): Promise<void>;
}

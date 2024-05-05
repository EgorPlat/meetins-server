import { ConsoleLogger } from '@nestjs/common';
export declare class MyLogger extends ConsoleLogger {
    error(message: any, stack?: string, context?: string): void;
}

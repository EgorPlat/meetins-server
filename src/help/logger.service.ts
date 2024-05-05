import { ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';

export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    const fileForLogs = 'error.logs';
      const date = new Date();
      fs.appendFileSync(fileForLogs, `
          ${date.getFullYear()} / ${date.getMonth()} / ${date.getDay()} \n
          Errors = ${message} \n
          Stack = ${stack} \n
          Context = ${context}
          --------------------------------------------------------
      `);
    super.error(message, stack, context);
  }
}

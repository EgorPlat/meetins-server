"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLogger = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
class MyLogger extends common_1.ConsoleLogger {
    error(message, stack, context) {
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
exports.MyLogger = MyLogger;
//# sourceMappingURL=logger.service.js.map
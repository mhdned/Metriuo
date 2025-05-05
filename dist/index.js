"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_middleware_1 = require("./middlewares/logger.middleware");
class Metriuo {
    constructor(options) {
        this.folder = options.folder;
        this.logFileFormat = options.logFileFormat ?? 'json';
    }
    static setup(options) {
        Metriuo.metriuoInstance = new Metriuo(options);
        return Metriuo.metriuoInstance;
    }
    monitoring() {
        return;
    }
    logger() {
        return (0, logger_middleware_1.requestLogger)({
            folder: this.folder,
            logFileFormat: this.logFileFormat,
        });
    }
}
module.exports = Metriuo;
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function requestLogger(options) {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    return (req, res, next) => {
        const start = process.hrtime();
        res.on('finish', () => {
            const diff = process.hrtime(start);
            const responseTime = `${(diff[0] * 1e3 + diff[1] / 1e6).toFixed(3)} ms`;
            const logData = {
                url: req.url,
                host: req.get('host') || '',
                baseUrl: req.baseUrl,
                hostname: req.hostname,
                ip: req.ip,
                ips: req.ips,
                location: req.headers['location'],
                userAgent: req.headers['user-agent'],
                connection: req.headers['connection'],
                authorization: req.headers['authorization'],
                path: req.path,
                body: req.body,
                query: req.query,
                params: req.params,
                method: req.method,
                httpVersion: req.httpVersion,
                responseTime,
                responseStatus: res.statusCode,
            };
            const logPath = path_1.default.join('./', `${options.folder}/${todayString}.${options.logFileFormat}`);
            if (!fs_1.default.existsSync(options.folder)) {
                fs_1.default.mkdirSync(options.folder, { recursive: true });
            }
            const logLine = JSON.stringify(logData) + '\n';
            fs_1.default.appendFile(logPath, logLine, (error) => {
                if (error) {
                    console.error('Failed to write log:', error);
                }
            });
        });
        next();
    };
}
//# sourceMappingURL=logger.middleware.js.map
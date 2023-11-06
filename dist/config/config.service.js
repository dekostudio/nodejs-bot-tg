"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv_1 = require("dotenv");
class ConfigService {
    constructor() {
        const { error, parsed } = (0, dotenv_1.config)();
        if (error)
            throw new Error('в файле .env не найден');
        if (!parsed)
            throw new Error('в .env ничего не содержится');
        this.config = parsed;
    }
    get(token) {
        const res = this.config[token];
        if (!res)
            throw new Error('Нет такого значение');
        return res;
    }
}
exports.ConfigService = ConfigService;

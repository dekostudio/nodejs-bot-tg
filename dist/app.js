"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const config_service_1 = require("./config/config.service");
const start_command_1 = require("./commands/start.command");
const telegraf_session_local_1 = __importDefault(require("telegraf-session-local"));
const parse_command_1 = require("./commands/parse.command");
class Bot {
    constructor(configService) {
        this.configService = configService;
        this.commands = [];
        this.bot = new telegraf_1.Telegraf(this.configService.get('TOKEN'));
        this.bot.use(new telegraf_session_local_1.default({ database: 'example_db.json' }).middleware());
    }
    init() {
        try {
            this.commands = [new start_command_1.StartCommand(this.bot), new parse_command_1.ParseCommand(this.bot)];
            for (const command of this.commands) {
                command.handle();
            }
            this.bot.launch();
            console.log('бот успешно запущен!');
        }
        catch (err) {
            console.log(err);
        }
    }
}
const bot = new Bot(new config_service_1.ConfigService());
bot.init();

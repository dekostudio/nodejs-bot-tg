"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseCommand = void 0;
const command_class_1 = require("./command.class");
class ParseCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
    }
    handle() {
        this.bot.start((ctx) => {
            console.log(ctx.message);
            const command = '/информация';
            if (command === ctx.message) {
                ctx.reply("Инфо");
            }
        });
    }
}
exports.ParseCommand = ParseCommand;

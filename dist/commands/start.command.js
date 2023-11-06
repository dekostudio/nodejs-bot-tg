"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const command_class_1 = require("./command.class");
class StartCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
    }
    handle() {
        this.bot.start((ctx) => {
            ctx.reply("Добро пожаловать в веб-студию Deko!", {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Заполнить бриф", callback_data: "into_breaf" }, { text: "Поддержка", callback_data: "support" }],
                        [{ text: "Информация", callback_data: "information" }],
                        [{ text: "Перейти на сайт", url: "telegraf.js.org" }, { text: "Перейти в телеграм группу", url: "t.me/dekostudio" }]
                    ]
                }
            });
        });
        this.bot.action("into_breaf", (ctx) => {
            ctx.reply("Какие услуги вам необходимы?", {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "UX - проектирование", callback_data: "1" }],
                        [{ text: "Интернет - Магазин", callback_data: "2" }],
                        [{ text: "Лендинг", callback_data: "3" }],
                        [{ text: "Сайт", callback_data: "4" }]
                    ]
                }
            });
        });
        this.bot.action("information", (ctx) => {
            ctx.reply("Обновление старых корпоративных сайтов, придание им современного вида, свойств и технических возможностей от 45 тысячи рублей Интернет магазин. От 100 тысяч рублей шабланного плана, и от миллиона рублей за оригинального и сложного проекта; Разработка приложении, создание приложении для телефона разного вида платформы ios, android и десктоп. От 200 тысяч рублей шабланного плана, и от 2 миллионов рублей за оригинального и сложного проекта; Адаптивный веб-дизайн, создание сайтов, одинаково эффективных как для доступа с компьютеров, так и с мобильных устройств от 35 тысяч рублей; Создание мобильных сайтов, ориентированный на доступ с мобильных устройств, в первую очередь - смартфонов от 30 тысяч рублей;");
        });
    }
}
exports.StartCommand = StartCommand;

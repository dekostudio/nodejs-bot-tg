import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      const replyMarkup = {
        inline_keyboard: [
          [
            { text: "Заполнить бриф", callback_data: "into_brief" },
            { text: "Поддержка", callback_data: "support" },
          ],
          [{ text: "Информация", callback_data: "information" }],
          [
            { text: "Перейти на сайт", url: "telegraf.js.org" },
            { text: "Перейти в телеграм группу", url: "t.me/dekostudio" },
          ],
        ],
      };

      ctx.reply(`Привет! 👋\n\nЯ - бот от студии веб-разработки DekoStudio.\n\nМы здесь, чтобы помочь вам с вопросами о веб-разработке, создании сайтов, мобильных приложений и других онлайн-проектах. Не стесняйтесь задавать любые вопросы или просить совета, и мы постараемся вам помочь.\n\nТакже у нас есть много интересных статей, ресурсов и проектов, которыми мы гордимся, и мы готовы поделиться этой информацией с вами. Как мы можем быть вам полезны сегодня? 🚀💻`, { reply_markup: replyMarkup });
    });

    this.bot.action("information", (ctx) => {
      const informationText = `Мы здесь, чтобы помочь вам воплотить в жизнь ваши онлайн-проекты и ответить на ваши вопросы о веб-разработке, дизайне, мобильных приложениях и многом другом.\n\n🌐 Наша экспертиза включает:\n\n🖥 Веб-разработку\n\n📱 Мобильные приложения\n\n💡 UI/UX Дизайн\n\n🚀 SEO и Маркетинг\n\n💻 Техническую поддержку\n\nЕсли у вас есть вопросы, идеи, или вы просто хотите узнать больше о нашей студии, не стесняйтесь обращаться к нам. Мы готовы помочь вам реализовать ваши проекты в интернете!\n\nЧем мы можем вам помочь сегодня? 💡`

      const replyMarkup = {
        inline_keyboard: [
          [{ text: "Кто мы ?", callback_data: "12" }],
          [{ text: "Наши приемущества ?", callback_data: "13" }],
        ],
      };

      ctx.reply(informationText, { reply_markup: replyMarkup });
    });

    this.bot.action("into_brief", (ctx) => {
      const replyMarkup = {
        inline_keyboard: [
          [{ text: "UX - проектирование", callback_data: "ux-choose" }],
          [{ text: "Интернет - Магазин", callback_data: "onlineshop-choose" }],
          [{ text: "Лендинг", callback_data: "landing-choose" }],
          [{ text: "Сайт", callback_data: "website-choose" }],
        ],
      };

      ctx.reply("Какие услуги вам необходимы?", { reply_markup: replyMarkup });
    });

    this.bot.action("ux-choose", (ctx) => {
      ctx.reply(`Пожалуйста, опишите ваш проект, уточните сроки, бюджет проекта и контактную информацию\n\n Пример:\n пока нету.`);
      ctx.session.awaitingDescription = true;
      ctx.session.selectedCategory = "UX - проектирование";
    });

    this.bot.action("onlineshop-choose", (ctx) => {
      ctx.reply(`Пожалуйста, опишите ваш проект, уточните сроки, бюджет проекта и контактную информацию\n\n Пример:\n пока нету.`);
      ctx.session.awaitingDescription = true;
      ctx.session.selectedCategory = "Интернет - Магазин";
    });

    this.bot.action("landing-choose", (ctx) => {
      ctx.reply(`Пожалуйста, опишите ваш проект, уточните сроки, бюджет проекта и контактную информацию\n\n Пример:\n пока нету.`);
      ctx.session.awaitingDescription = true;
      ctx.session.selectedCategory = "Лендинг";
    });

    this.bot.action("website-choose", (ctx) => {
      ctx.reply(`Пожалуйста, опишите ваш проект, уточните сроки, бюджет проекта и контактную информацию\n\n Пример:\n пока нету.`);
      ctx.session.awaitingDescription = true;
      ctx.session.selectedCategory = "Сайт";
    });

    this.bot.on("text", (ctx) => {
      if (ctx.session.awaitingDescription) {
        const userId = ctx.from.id;
        const username = ctx.from.username;
        const description = ctx.message.text;
        const category = ctx.session.selectedCategory;

        this.sendToYourself(userId, username, description, category);
        
        ctx.session.awaitingDescription = false;
        ctx.session.selectedCategory = undefined;
        ctx.reply("Спасибо за ваше описание проекта!");
      }
    });
  }

  private sendToYourself(userId: number, username: string | undefined, description: string, category: string) {
    const yourUserId = "782797114:782797114";

    this.bot.telegram.sendMessage(yourUserId, `Пользователь с никнеймом: ${username}\n id: ${userId} \nНовое описание проекта:\n${description}\n\nВыбранная категория: ${category}`);
  }
}

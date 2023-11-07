import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  descriptionProject(ctx: { reply: (arg0: string) => void; }): void {
    ctx.reply(`Пожалуйста, опишите ваш проект, уточните сроки, бюджет проекта и контактную информацию\n\nПример:\n\nИмя проекта: (Название проекта)\nЗаказчик: (Имя и контактные данные заказчика)\nЦель проекта: (Краткое описание целей и ожидаемых результатов проекта)\nЦелевая аудитория: (Описание вашей целевой аудитории, включая характеристики пользователей)\nОсновные требования:\n\nФункциональные требования: (Перечислите основные функции и возможности, которые должны быть включены в веб-приложение)\nДизайн и интерфейс: (Укажите особенности дизайна и интерфейса, включая цветовую палитру, структуру страниц и т. д.)\nТехнические требования: (Укажите технологии и платформы, которые следует использовать)\nСроки и бюджет:\n\nСроки: (Укажите дату начала и завершения проекта)\nБюджет: (Укажите общий бюджет на проект)\nДополнительная информация:\n\nКонкуренты: (Укажите ваши конкуренты и их веб-приложения, если применимо)\nОсобенности проекта: (Любые особенности или требования, которые не были учтены выше)`);
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

    this.bot.action("information", (ctx): void => {
      const informationText = `Мы здесь, чтобы помочь вам воплотить в жизнь ваши онлайн-проекты и ответить на ваши вопросы о веб-разработке, дизайне, мобильных приложениях и многом другом.\n\n🌐 Наша экспертиза включает:\n\n🖥 Веб-разработку\n\n📱 Мобильные приложения\n\n💡 UI/UX Дизайн\n\n🚀 SEO и Маркетинг\n\n💻 Техническую поддержку\n\nЕсли у вас есть вопросы, идеи, или вы просто хотите узнать больше о нашей студии, не стесняйтесь обращаться к нам. Мы готовы помочь вам реализовать ваши проекты в интернете!\n\nЧем мы можем вам помочь сегодня? 💡`

      const replyMarkup = {
        inline_keyboard: [
          [{ text: "Кто мы ?", callback_data: "12" }],
          [{ text: "Наши приемущества ?", callback_data: "13" }],
        ],
      };

      ctx.reply(informationText, { reply_markup: replyMarkup });
    });

    this.bot.action("into_brief", (ctx): void => {
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

    this.bot.action("ux-choose", (ctx): void => {
      this.descriptionProject(ctx)
      ctx.session.awaitingDescription = true;
      ctx.session.selectedCategory = "UX - проектирование";
    });

    this.bot.action("onlineshop-choose", (ctx): void => {
      this.descriptionProject(ctx)
      ctx.session.awaitingDescription = true;
      ctx.session.selectedCategory = "Интернет - Магазин";
    });

    this.bot.action("landing-choose", (ctx): void => {
      this.descriptionProject(ctx)
      ctx.session.awaitingDescription = true;
      ctx.session.selectedCategory = "Лендинг";
    });

    this.bot.action("website-choose", (ctx): void => {
      this.descriptionProject(ctx)
      ctx.session.awaitingDescription = true;
      ctx.session.selectedCategory = "Сайт";
    });

    this.bot.on("text", (ctx): void => {
      if (ctx.session.awaitingDescription) {
        const userId = ctx.from.id;
        const username = ctx.from.username;
        const description = ctx.message.text;
        const category = ctx.session.selectedCategory;

        this.sendToYourself(userId, username, description, category);
        
        ctx.session.awaitingDescription = false;
        ctx.session.selectedCategory = "";

        ctx.reply(`💼 Данная информация была передана нашим специалистам, скоро они вам ответят ✉️ \n\nЕсли возники какие - то проблемы, то звоните по номеру 📞\n+7 (988) 175-11-12`);
      }
    });
  }

  private sendToYourself(userId: number, username: string | undefined, description: string, category: string): void {
    const sendInfo = `🚀 У нас новый заказ!\n\n🌐 Приступаем к работе! 💼\n\nДанные пользователя 👤\n\nusername: ${username}\nid: ${userId}\n\nИнформация о проекте 📖\n\nВыбранная категория: ${category}\nОписание проекта: ${description}`
    this.bot.telegram.sendMessage(process.env.USER_ID as string | number, sendInfo);
  }
}

import { Telegraf, session } from "telegraf";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import LocalSession from "telegraf-session-local";

class Bot {

  bot: Telegraf<IBotContext>;
  commands: Command[] = []

  constructor(private readonly configService:IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
    this.bot.use(new LocalSession({ database: "example_db.json" }).middleware());
  }

  init() {
    try {
      this.commands = [new StartCommand(this.bot)]

      for(const command of this.commands) {
        command.handle()
      }

      this.bot.launch();
      console.log('бот успешно запущен!')
    } catch (err) {
      console.log(err)
    }    
  }
}

const bot = new Bot(new ConfigService());
bot.init();
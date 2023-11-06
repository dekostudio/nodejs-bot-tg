import { config, DotenvParseOutput } from "dotenv";
import { IConfigService } from "./config.interface";

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor() {
    const {error, parsed} = config();

    if (error) throw new Error('в файле .env не найден');
    if (!parsed) throw new Error('в .env ничего не содержится');

    this.config = parsed;
  }

  get(token: string): string {
    const res = this.config[token];
    
    if(!res) throw new Error('Нет такого значение');

    return res;
  }
}
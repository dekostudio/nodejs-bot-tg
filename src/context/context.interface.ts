import { Context } from "telegraf";

export interface SessionData {
  selectedCategory: any;
  awaitingDescription: boolean;
}

export interface IBotContext extends Context {
  session: SessionData;
}
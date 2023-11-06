import { Context } from "telegraf";

export interface SessionData {
  description: string;
  selectedCategory: string;
  awaitingDescription: boolean;
}

export interface IBotContext extends Context {
  session: SessionData;
}
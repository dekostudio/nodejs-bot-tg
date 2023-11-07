import { Context } from "telegraf";

export interface SessionData {
  awaitingFileUpload: boolean;
  description: string;
  selectedCategory: string;
  awaitingDescription: boolean;
}

export interface IBotContext extends Context {
  session: SessionData;
}
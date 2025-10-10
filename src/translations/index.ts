import { ru } from './ru';
import { en } from './en';

export type TranslationKeys = keyof typeof ru;

export enum Language {
  ru = 'ru',
  en = 'en',
}

export const translations = {
  [Language.ru]: ru,
  [Language.en]: en,
};

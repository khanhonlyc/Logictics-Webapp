import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import HeaderEN from './locales/en/home-page/Header-EN.json';
import HeaderVI from './locales/vi/home-page/Header-VI.json';
import HomeMainVI from "./locales/vi/home-page/Main-VI.json";
import HomeMainEN from './locales/en/home-page/Main-EN.json';
import HomeFooterVI from './locales/vi/home-page/Footer-VI.json';
import HomeFooterEN from './locales/en/home-page/Footer-EN.json';
import AboutEN from './locales/en/introduction-page/AboutUs-EN.json';
import AboutVI from './locales/vi/introduction-page/AboutUs-VI.json'

export const locales = {
  en: "EN",
  vi: "VI"
}
// the translations
const resources = {
  en: {
    Header: HeaderEN,
    Main: HomeMainEN,
    Footer: HomeFooterEN,
    About: AboutEN
  },
  vi: {
    Header: HeaderVI,
    Main: HomeMainVI,
    Footer: HomeFooterVI,
    About: AboutVI
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources,
    ns: ["Header", "Main", "Footer", "About"],
    fallbackLng: "vi",
    debug: true,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
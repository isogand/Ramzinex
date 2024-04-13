// import i18n from 'i18next';
// import {initReactI18next} from 'react-i18next';
// import * as resources from './resources';
//
// i18n.use(initReactI18next).init({
//   compatibilityJSON: 'v3',
//   resources: {
//     ...Object.entries(resources).reduce(
//       (acc, [key, value]) => ({
//         ...acc,
//         [key]: {
//           translation: value,
//         },
//       }),
//       {},
//     ),
//   },
//   fallbackLng: 'en',
// });
//
// export default i18n;


import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import axios from "axios";

const loadResources = async (locale) => {
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts", {
      params: { lang: locale },
    })
    .then((res) => {
      return res.data.slice(0, 3);
    })
    .catch((err) => {
      console.log(err);
    });
};

const detectorOptions = {
  // order and from where user language should be detected
  order: ["cookie", "localStorage", "navigator"],

  // keys or params to lookup language from
  lookupCookie: "locales",
  lookupLocalStorage: "locales",

  // cache user language on
  caches: ["localStorage", "cookie"],
  excludeCacheFor: ["cimode"],

  //   only detect languages that are in the whitelist
  checkWhiteList: true,
};

const backendOptions = {
  loadPath: "/locales/{{lng}}/{{ns}}.json", //used to pass language and namespace to custom XHR function
  request: (options, url, payload, callback) => {
    try {
      const [lng] = url.split("|");

      //this mocks the HTTP fetch plugin behaviour so it works with the backend AJAX pattern in this XHR library
      //https://github.com/i18next/i18next-http-backend/blob/master/lib/request.js#56
      loadResources(lng).then((data) => {
        callback(null, {
          data: JSON.stringify(data),
          status: 200, //status code is required by XHR plugin to determine success or failure
        });
      });
    } catch (e) {
      console.error(e);
      callback(null, {
        status: 500,
      });
    }
  },
};

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(HttpApi)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    backend: backendOptions,
    detection: detectorOptions,
    whitelist: ["en", "zh", "jp", "fr"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;


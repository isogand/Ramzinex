import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import axios from "axios";

const loadResources = async (locale) => {
  return await axios
    .get("http://127.0.0.1:9000/Market%20listings.json", {
      params: { lang: locale },
    })
    .then((res) => {
      return res.data.data.slice(0, 3);
    })
    .catch((err) => {
      console.log("err",err);
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
      console.error("e",e);
      callback(null, {
        status: 500,
      });
    }
  },
};

i18n
  .use(initReactI18next)
  // init i18next
// Disable debug mode, which includes logging
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    debug: false,
    fallbackLng: "en",
    backend: backendOptions,
    detection: detectorOptions,
    whitelist: ["en", "fa"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;


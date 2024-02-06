import {initReactI18next} from "react-i18next";

import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: {
            "Завершён": "Ended"
        }
    },
    ru: {
        translation: {
            "Ended": "Завершён"
        }
    }
}

i18next.use(initReactI18next).use(I18nextBrowserLanguageDetector).init({
    resources,
    lng: "en",
    fallbackLng: "en",

    interpolation: {
        escapeValue: false
    }
});
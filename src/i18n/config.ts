import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import zh from './zh/index.json';
import en from './en/index.json';

export const resources = {
    en:{
        translations:en
    },
    zh:{
        translations:zh
    }
} as const;

i18n.use(initReactI18next)
    .init({
        resources,
        lng:'zh',
        fallbackLng: "zh",
        debug:true,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        interpolation:{
            escapeValue:false // not needed for react as it escapes by default
        },

        // keySeparator: false, //这一项决定是否可以使用 o.key 的方式翻译
    })
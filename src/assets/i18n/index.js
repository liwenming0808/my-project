import Vue from "vue";
import VueI18n from "vue-i18n";
import locale from "element-ui/lib/locale";

import elementEnLocale from "element-ui/lib/locale/lang/en";
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN";
import enLocale from "./en";
import zhLocale from "./zh";

Vue.use(VueI18n);

const messages = {
  en: {
    message: "hello",
    ...enLocale,
    ...elementEnLocale,
  },
  zh: {
    message: "你好",
    ...zhLocale,
    ...elementZhLocale,
  },
};
const i18n = new VueI18n({
  locale: sessionStorage.getItem("locale") || "zh",
  messages,
});
locale.i18n((key, value) => i18n.t(key, value));

export default i18n;

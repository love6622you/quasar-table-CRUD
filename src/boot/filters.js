import { boot } from "quasar/wrappers";
import { date } from "quasar";

export const filters = {
  //#region Date Filter
  Date: {
    /**
     * 日期規則，使用於 q-input
     */
    rules: {
      /**
       * 檢查日期欄位是否在今天之前
       */
      checkInputWithinToday: (val) => {
        const [year, month, day] = val.split("/");
        const currentTime = date
          .buildDate({
            year: +year,
            month: +month,
            day: +day,
          })
          .getTime();

        return currentTime <= Date.now() ? true : "生日需在今天之前";
      },
    },
    /**
     * 日期項目，使用於 q-date
     */
    options: {
      /**
       * 僅能選擇今天之前的日期
       */
      limitDateOnTodayAgo:
        (format = "YYYY/MM/DD") =>
        (val) => {
          const selectedDate = date.formatDate(val, format);
          const today = date.formatDate(Date.now(), format);
          return selectedDate <= today;
        },
    },
  },
  //#endregion
};

export default boot(({ app }) => {
  app.config.globalProperties.$filters = filters;
});

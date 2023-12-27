import { boot } from "quasar/wrappers";
import { date } from "quasar";

export default boot(({ app }) => {
  //#region globalProperties
  app.config.globalProperties.$date = date;
  //#endregion
});

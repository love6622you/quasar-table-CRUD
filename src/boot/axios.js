import { boot } from "quasar/wrappers";
import axios from "axios";
import { LoadingBar } from "quasar";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// const api = axios.create({ baseURL: "https://api.example.com" });
const api = axios.create({ baseURL: "http://35.194.177.50:7777/" });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  api.interceptors.request.use(
    (config) => {
      LoadingBar.start(1500);
      return config;
    },
    (error) => {
      console.error("axios.interceptors.request", error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      LoadingBar.stop();
      return response;
    },
    (error) => {
      LoadingBar.stop();

      if (error.response) {
        switch (error.response.status) {
          default:
            return Promise.reject(error.response.data);
        }
      } else {
        console.error(error);
      }
    }
  );

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };

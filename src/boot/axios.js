import axios from "axios";
import { Notify } from "quasar";
import { boot } from "quasar/wrappers";
import env from "../env";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  },
  maxRedirects: 0
});

export default boot(({ app, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axio = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  api.interceptors.response.use(
    (response) => {
      if (response.config.method === "get") {
        if (response.status === 200) {
          if (response.data !== undefined && response.data.access_token !== undefined) {
            localStorage.setItem(
              "DROPBOX_SESSION_INFO",
              JSON.stringify(response.data)
            );
          }
        }
      }
      return response.data;
    },
    (error) => {
      if (error.response === undefined) {
        Notify.create({
          color: "red-5",
          textColor: "white",
          icon: "fas fa-exclamation-triangle",
          message:
            "No se pudo establecer conexión con el servidor. Revisa tu conexión a internet. " +
            error,
        });
      } else {
        if (error.response.status === 401) {
          if (error.response.data.message) {
            Notify.create({
              message: error.response.data.message,
              color: "black",
            });
          } else {
            Notify.create({
              message: "Debe autenticarse para realizar esta acción.",
              color: "black",
            });
          }
          localStorage.removeItem("DROPBOX_SESSION_INFO");
        } else if (error.response.status === 403) {
          Notify.create({
            message: error.response.data,
            color: "red",
          });
          localStorage.removeItem("DROPBOX_SESSION_INFO");
        } else if (error.response.status === 404) {
          if (error.response.data.message) {
            Notify.create({
              message: error.response.data.message,
              color: "black",
            });
          } else {
            Notify.create({
              message: "Ruta no encontrada - 404",
              color: "black",
            });
          }
        } else if (error.response.status === 422) {
          if (error.response.data.length > 0) {
            let message = "";
            for (const i of error.response.data) {
              message += `${i.message} \n`;
            }
            Notify.create({
              message: message,
              color: "red",
              position: "bottom",
            });
          } else {
            Notify.create({
              message: error.response.data.message,
              color: "red",
              position: "bottom",
            });
          }
        } else if (error.response.status === 500) {
          Notify.create({
            message: "Error de conexión con el servidor",
            color: "red",
            position: "bottom",
          });
        }
        let data = error.response.data;
        if (data) {
          if (data.status === 403) {
            Notify.create({
              color: "red-5",
              textColor: "white",
              icon: "fas fa-exclamation-triangle",
              message: data.error.error_description,
            });
          }
          if (data.status === 500) {
            Notify.create({
              color: "red-5",
              textColor: "white",
              icon: "fas fa-exclamation-triangle",
              message: "Error interno en servidor" + data.message,
            });
          }
          if (data.status === 400) {
            Notify.create({
              color: "red-5",
              textColor: "white",
              icon: "fas fa-exclamation-triangle",
              message: `${data.name}: ${data.error.error} ${data.error.error_description}`,
            });
          }
        }
      }
    }
  );

  api.interceptors.request.use(
    async function (config) {
      store.dispatch("generals/fetchAccessToken");
      const token =
        store.state.generals.DROPBOX_SESSION_INFO !== null | undefined
          ? store.state.generals.DROPBOX_SESSION_INFO
          : false;
      if (token) {
        if (!config.headers) {
          config.headers = {};
        }
        config.headers = {
          Authorization: "Bearer " + token,
        };
      }
      config.headers.redirect = true
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
});

export { api };

let baseUrl;

import state from "../state";
import router from "../router";

export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    console.log("Installed", options);

    baseUrl = options.baseUrl;

    Vue.prototype.$fetch = $fetch;
  }
};

export async function $fetch(url, options) {
  const finalOptions = Object.assign(
    {},
    {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    },
    options
  );
  const response = await fetch(`${baseUrl}${url}`, finalOptions);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else if (response.status === 403) {
    // If the session is no longer valid
    // We logout
    state.user = null;
    // If the route is private
    // We go to the login screen
    if (router.currentRoute.matched.some(r => r.meta.private)) {
      router.replace({
        name: "login",
        params: {
          wantedRoute: router.currentRoute.fullPath
        }
      });
    }
  } else {
    const message = await response.text();
    const error = new Error(message);
    error.response = response;
    throw error;
  }
}

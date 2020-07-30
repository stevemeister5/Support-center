let baseUrl;

export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    console.log("Installed", options);

    baseUrl = options.baseUrl;

    Vue.prototype.$fetch = $fetch;
  },
};

export async function $fetch(url) {
  const response = await fetch(`${baseUrl}${url}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const error = new Error("error");
    throw error;
  }
}

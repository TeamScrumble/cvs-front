module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-iconify/babel",
        {
          icons: [
            "material-symbols-light:home-rounded",
            "material-symbols-light:home-outline-rounded",
            "material-symbols-light:search-rounded",
            "material-symbols-light:person-rounded",
            "material-symbols-light:person-outline-rounded",
            "ph:heart-light",
            "ph:heart-fill",
            "fluent:alert-20-regular",
          ],
        },
      ],
    ],
  };
};

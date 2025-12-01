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
            "material-symbols-light:person-rounded",
            "material-symbols-light:person-outline-rounded",
            "material-symbols-light:location-on",
            "material-symbols-light:location-on-outline",
            "material-symbols-light:chevron-right-rounded",
            "material-symbols-light:chevron-left-rounded",
            "circum:search",
            "ph:heart-light",
            "ph:heart-fill",
            "fluent:alert-20-regular",
            "icon-park-outline:down-square",
            "icon-park-outline:up-square",
          ],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};

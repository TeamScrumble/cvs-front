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
            "material-symbols-light:info-outline-rounded",
            "material-symbols-light:receipt-outline-rounded",
            "material-symbols-light:add-rounded",
            "material-symbols-light:check-circle-rounded",
            "material-symbols-light:circle-outline",
            "carbon:thumbs-up",
            "carbon:thumbs-up-filled",
            "circum:search",
            "ph:heart-light",
            "ph:heart-fill",
            "ph:x-circle-fill",
            "fluent:alert-20-regular",
            "fluent:share-ios-20-regular",
            "icon-park-outline:down-square",
            "icon-park-outline:up-square",
            "solar:star-bold",
            "si:expand-more-alt-line",
            "si:expand-less-alt-line",
          ],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};

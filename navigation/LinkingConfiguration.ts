import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              Affirmation: "one",
            },
          },
          TabTwo: {
            screens: {
              Favorites: "two",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};

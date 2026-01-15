import { Image } from "react-native";

const validateImage = (uri: string): Promise<boolean> =>
  new Promise((resolve) => {
    if (!uri) {
      resolve(false);
      return;
    }

    Image.getSize(
      uri,
      () => resolve(true),
      () => resolve(false)
    );
  });

export default validateImage;

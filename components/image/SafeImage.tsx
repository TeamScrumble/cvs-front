import React, { useEffect, useState } from "react";
import validateImage from "./validateImage";
import { Image, StyleSheet } from "react-native";
import SkeletonImage from "./SkeletonImage";
import EmptyImage from "../EmptyImage";
import { colors } from "@/constants";

type ImageStatus = "idle" | "loading" | "valid" | "error";

type Props = {
  uri: string;
  showErrorResult?: boolean;
}

const SafeImage = ({ uri, showErrorResult = false }: Props) => {
  const [status, setStatus] = useState<ImageStatus>("idle");

  useEffect(() => {
    let alive = true;

    const check = async () => {
      setStatus("loading");
      const ok = await validateImage(uri);
      if (alive) {
        setStatus(ok ? "valid" : "error");
      }
    };

    check();

    return () => {
      alive = false;
    };
  }, [uri]);

  if (status === "loading") {
    return <SkeletonImage />;
  }

  if (status === "error") {
    return showErrorResult ? <EmptyImage /> : null;
  }

  return (
    <Image
      source={{ uri }}
      style={styles.image}
      resizeMode="contain"
      onError={() => setStatus("error")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: colors.SLATE_200,
    borderRadius: 4,
  },
});

export default SafeImage;
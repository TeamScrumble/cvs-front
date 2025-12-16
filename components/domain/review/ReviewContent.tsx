import Divider from "@/components/Divider";
import { colors, fonts } from "@/constants";
import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LikeButton from "./LikeButton";

interface ReviewContentProps {
  content: string;
  imageUrlList?: string[];
  likeCount: number;
  clicked?: boolean;
}

function ReviewContent({
  content,
  imageUrlList = [],
  likeCount,
  clicked = false,
}: ReviewContentProps) {
  const [isZoomIn, setIsZoomIn] = useState(false);

  const imageSize = useMemo(
    () => (isZoomIn ? 320 : 90),
    [isZoomIn]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.contentText}>{content}</Text>
      <Pressable
        style={isZoomIn ? styles.zoomInContainer : styles.zoomOutContainer}
        onPress={() => setIsZoomIn((prev) => !prev)}
      >
        <Image
          style={styles.image}
          source={require("@/assets/images/snack_image.png")}
          alt="dummy Image"
          width={imageSize}
          height={imageSize}
        />
        <Image
          style={styles.image}
          source={require("@/assets/images/snack_image.png")}
          alt="dummy Image"
          width={imageSize}
          height={imageSize}
        />
        <Image
          style={styles.image}
          source={require("@/assets/images/snack_image.png")}
          alt="dummy Image"
          width={imageSize}
          height={imageSize}
        />
      </Pressable>
      <LikeButton likeCount={likeCount} clicked={clicked} onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  contentText: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.28,
    color: colors.SLATE_800,
  },
  zoomOutContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
  },
  zoomInContainer: {
    alignItems: "center",
    gap: 8,
  },
  image: {
    borderRadius: 4,
    borderColor: colors.SLATE_200,
  },
});

export default ReviewContent;

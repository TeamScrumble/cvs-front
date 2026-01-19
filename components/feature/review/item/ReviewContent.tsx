import { colors } from "@/constants";
import React, { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import LikeButton from "./LikeButton";
import ReviewContentText from "./ReviewContentText";

interface ReviewContentProps {
  content: string;
  imageUrlList?: string[];
  likeCount: number;
  isLikeByMe?: boolean;
  addReviewLike: () => void;
  deleteReviewLike: () => void;
}

function ReviewContent({
  content,
  imageUrlList = [],
  likeCount,
  isLikeByMe = false,
  addReviewLike,
  deleteReviewLike,
}: ReviewContentProps) {
  const [isZoomIn, setIsZoomIn] = useState(false);

  const imageSize = useMemo(() => (isZoomIn ? 320 : 90), [isZoomIn]);

  const handleLikePress = () => {
    if (isLikeByMe) {
      deleteReviewLike();
    } else {
      addReviewLike();
    }
  };

  return (
    <View style={styles.container}>
      <ReviewContentText text={content} />
      <Pressable
        style={isZoomIn ? styles.zoomInContainer : styles.zoomOutContainer}
        onPress={() => setIsZoomIn((prev) => !prev)}
      >
        {imageUrlList.map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={styles.image}
            alt="dummy Image"
            width={imageSize}
            height={imageSize}
          />
        ))}
      </Pressable>
      <LikeButton
        likeCount={likeCount}
        clicked={isLikeByMe}
        onPress={handleLikePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
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
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.SLATE_200,
  },
});

export default ReviewContent;

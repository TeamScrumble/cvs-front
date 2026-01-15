import { colors } from "@/constants";
import React, { memo, useEffect } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const ReviewItemSkeleton = () => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000 }),
        withTiming(0.4, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const SkeletonBlock = ({ style }: { style: ViewStyle }) => (
    <Animated.View
      style={[
        { backgroundColor: colors.SLATE_200, borderRadius: 4 },
        animatedStyle,
        style,
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SkeletonBlock style={{ width: 32, height: 32, borderRadius: 16 }} />
        <View style={{ gap: 4 }}>
          <SkeletonBlock style={{ width: 80, height: 12 }} />
          <SkeletonBlock style={{ width: 120, height: 12 }} />
        </View>
      </View>

      <SkeletonBlock style={{ width: "100%", height: 32 }} />

      <View style={{ gap: 8 }}>
        <SkeletonBlock style={{ width: "100%", height: 16 }} />
        <SkeletonBlock style={{ width: "90%", height: 16 }} />
        <SkeletonBlock style={{ width: "60%", height: 16 }} />
      </View>

      <View style={styles.imageContainer}>
        <SkeletonBlock style={styles.image} />
        <SkeletonBlock style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  imageContainer: {
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.SLATE_200,
  },
});

export default memo(ReviewItemSkeleton);

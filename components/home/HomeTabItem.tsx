import { colors, fonts } from "@/constants";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HomeTabItemProps {
  label: string;
  isFocused: boolean;
  onPress: () => void;
}

export default function HomeTabItem({
  label,
  isFocused,
  onPress,
}: HomeTabItemProps) {
  const isLogo = label === "편:편";

  if (isLogo) {
    return (
      <Pressable onPress={onPress} style={styles.logoContainer}>
        <Text style={styles.logoText}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.tabContainer}>
      <Text
        style={[
          styles.tabText,
          {
            fontFamily: isFocused ? fonts.BOLD : fonts.REGULAR,
          },
        ]}
      >
        {label}
      </Text>
      {isFocused && <View style={styles.underline} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    paddingVertical: 10,
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontFamily: fonts.CHAB,
    color: colors.MAIN,
  },
  tabContainer: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  tabText: {
    fontSize: 16,
    color: colors.SLATE_800,
  },
  underline: {
    position: "absolute",
    bottom: 4,
    width: "100%",
    height: 2,
    backgroundColor: colors.SLATE_800,
    borderRadius: 2,
  },
});

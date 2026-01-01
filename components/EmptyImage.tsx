import React from "react";
import { StyleSheet, Text, View } from "react-native";
import EmptyImageIcon from "@/assets/images/empty_image.svg";
import { colors, fonts } from "@/constants";

function EmptyImage() {
  return (
    <View style={styles.container}>
      <EmptyImageIcon style={styles.icon}/>
      <Text style={styles.text}>이미지 준비중입니다</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SLATE_TINT_10,
    width: 320,
    height: 320,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  icon: {
    width: 32,
    height: 32,
  },
  text: {
    color: colors.SLATE_500,
    fontFamily: fonts.REGULAR,
    fontSize: 12,
  },
});

export default EmptyImage;

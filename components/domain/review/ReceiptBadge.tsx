import { colors, fonts } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ReceiptIcon from "@/assets/images/receipt_icon.svg";

function ReceiptBadge() {
  return (
    <View style={styles.container}>
      <ReceiptIcon style={{ width: 16, height: 16 }}/>
      <Text style={styles.text}>인증</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.NEON_GREEN_50,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  text: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0,
    color: colors.GREEN,
  },
});

export default ReceiptBadge;

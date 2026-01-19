import CustomButton from "@/components/ui/button/CustomButton";
import { colors, fonts } from "@/constants";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ReviewContentText = ({ text }: { text: string }) => {
  const MAX_LINES = 4; // 5줄 이상이면 일립시스

  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  return (
    <View style={{ position: "relative" }}>
      {/* 전체 텍스트 측정용 (화면에는 안 보임) */}
      <Text
        style={[styles.text, { position: "absolute", opacity: 0 }]}
        onTextLayout={(e) => {
          if (e.nativeEvent.lines.length > MAX_LINES) {
            setIsTruncated(true);
          }
        }}
      >
        {text}
      </Text>

      {/* 실제 표시용 */}
      <Text
        style={[styles.text, { color: colors.SLATE_800 }]}
        numberOfLines={expanded ? undefined : MAX_LINES}
      >
        {text}
      </Text>

      {!expanded && isTruncated && (
        <View style={styles.buttonContainer}>
          <CustomButton
            label="더보기"
            variant="underline"
            fontFamily={fonts.REGULAR}
            lineHeight={1.5}
            letterSpacing={0.28}
            onPress={() => setExpanded(true)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.28,
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});

export default ReviewContentText;

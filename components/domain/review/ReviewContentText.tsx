import { colors, fonts } from "@/constants";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ReviewContentText = ({ text }: { text: string }) => {
  const MAX_LINES = 4; // 5줄 이상이면 일립시스

  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  return (
    <View>
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
      <Text style={[styles.text, { color: colors.SLATE_800 }]} numberOfLines={expanded ? undefined : MAX_LINES}>
        {text}
      </Text>

      {!expanded && isTruncated && (
        <Text
          onPress={() => setExpanded(true)}
          style={[styles.text, { color: colors.SLATE_500, textDecorationLine: "underline", alignSelf: "flex-end" }]}
        >
          더보기
        </Text>
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
});

export default ReviewContentText;
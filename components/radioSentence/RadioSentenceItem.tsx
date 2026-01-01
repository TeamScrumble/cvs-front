import { colors, fonts, icons } from "@/constants";
import { Pressable, StyleSheet, Text } from "react-native";
import Icon from "react-native-iconify";

type Props = {
  label: string;
  selected: boolean;
  error?: string;
  onPress: () => void;
};

function RadioSentenceItem({ label, selected, error = "", onPress }: Props) {
  return (
    <Pressable
      style={styles.container}
      key={`RadioOption_${label}`}
      onPress={onPress}
    >
      {error ? (
        <Icon
          icon={icons.circleOutline}
          size={20}
          color={colors.ERROR_BORDER}
        />
      ) : selected ? (
        <Icon icon={icons.checkCircle} size={20} color={colors.MAIN} />
      ) : (
        <Icon icon={icons.circleOutline} size={20} color={colors.SLATE_500} />
      )}
      <Text style={styles.labelText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 11,
    gap: 10,
  },
  labelText: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    color: colors.SLATE_800,
  },
});

export default RadioSentenceItem;

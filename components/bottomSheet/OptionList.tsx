import { colors, fonts, icons } from "@/constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SelectOption } from "./SelectBottomSheet";
import Icon from "react-native-iconify";

type Props<T> = SelectOption<T> & {
  selected?: boolean;
  onPress: (value: T) => void;
}

const SelectOptionItem = <T,>({ label, description, onPress, value, selected = false }: Props<T>) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(value)}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      {selected && 
        <View style={styles.iconContainer}>
          <Icon icon={icons.check} size={24} />
        </View>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapper: {
    flexShrink: 1,
    gap: 8,
  },
  label: {
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    color: colors.SLATE_800,
  },
  description: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: colors.SLATE_300,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default SelectOptionItem;
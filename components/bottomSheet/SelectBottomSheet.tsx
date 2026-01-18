import useBottomSheetModal from "@/hooks/useBottomSheetModal";
import { useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomBottomSheetModal from "./CustomBottomSheetModal";
import SelectTrigger from "./SelectTrigger";
import { colors, fonts } from "@/constants";
import SelectOptionItem from "./OptionList";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type SelectOption<T> = {
  label: string;
  description?: string;
  value: T;
}

type Props<T> = {
  value: T | null;
  options: SelectOption<T>[];
  placeholder?: string;
  onChange: (value: T) => void;
  disabled?: boolean;
}

const SelectBottomSheet = <T,>({ value, options, placeholder, onChange, disabled }: Props<T>) => {
  const insets = useSafeAreaInsets();
  const { bottomSheetModalRef, present, dismiss } = useBottomSheetModal();
  const selectedLabel = useMemo(() => {
    return options.find((option) => option.value === value)?.label ?? "";
  }, [value, options]);
  const onPress = useCallback((value: T) => {
    dismiss();
    onChange(value);
  }, [dismiss, onChange]);
  return (
    <>
      <SelectTrigger
        label={selectedLabel}
        placeholder={placeholder}
        disabled={disabled}
        onPress={present}
      />
      <CustomBottomSheetModal ref={bottomSheetModalRef} hasHandle={false} snapPoints={[368 + insets.bottom]}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>정렬</Text>
          </View>
          <View style={styles.content}>
            {options.map((option, index) => (
              <SelectOptionItem
                key={`SelectOptionItem_${index}`}
                label={option.label}
                description={option.description}
                value={option.value}
                onPress={onPress}
                selected={option.value === value}
              />
            ))}
          </View>
        </View>
      </CustomBottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    color: colors.SLATE_800,
  },
  content: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 10,
  }
})

export default SelectBottomSheet;
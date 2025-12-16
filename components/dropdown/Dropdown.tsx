import React, { useRef, useState } from "react";
import { View, StyleSheet, ViewStyle, LayoutRectangle } from "react-native";
import DropdownTrigger from "./DropdownTrigger";
import DropdownList from "./DropdownList";

export interface DropdownOption<T> {
	label: string;
	value: T;
	tooltip?: string;
}

export interface Props<T> {
	value: T | null;
	options: DropdownOption<T>[];

	placeholder?: string;
	onChange: (value: T) => void;

	disabled?: boolean;

	style?: ViewStyle;
	dropdownStyle?: ViewStyle;
	optionStyle?: ViewStyle;

	maxHeight?: number;
}

export default function Dropdown<T>({
	value,
	options,
	placeholder = "선택하세요",
	onChange,
	disabled = false,
	style,
	dropdownStyle,
	optionStyle,
	maxHeight = 190,
}: Props<T>) {
	const [open, setOpen] = useState(false);
	const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
	const triggerRef = useRef<View>(null);

	const selectedLabel =
		options.find((o) => o.value === value)?.label ?? "";

	const handleTriggerPress = () => {
		setOpen((prev) => !prev);
		triggerRef.current?.measureInWindow((x, y, width, height) => {
			setTriggerLayout({ x, y, width, height });
		});
	};

	return (
		<View style={styles.container}>
			<DropdownTrigger
				ref={triggerRef}
				label={selectedLabel}
				placeholder={placeholder}
				disabled={disabled}
				style={style}
				isOpen={open}
				onPress={handleTriggerPress}
			/>

			<DropdownList
				visible={open}
				value={value}
				options={options}
				width={128}
				maxHeight={maxHeight}
				triggerLayout={triggerLayout}
				dropdownStyle={dropdownStyle}
				optionStyle={optionStyle}
				onClose={() => setOpen(false)}
				onSelect={(v) => {
					onChange(v);
					setOpen(false);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
});

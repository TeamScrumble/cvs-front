import { Portal } from "@gorhom/portal";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { LayoutRectangle, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import DropdownList from "./DropdownList";
import DropdownTrigger from "./DropdownTrigger";

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

export interface DropdownRef {
	close: () => void;
}

const Dropdown = forwardRef<DropdownRef, Props<any>>((props, ref) => {
	const {
		value,
		options,
		placeholder = "선택하세요",
		onChange,
		disabled = false,
		style,
		dropdownStyle,
		optionStyle,
		maxHeight = 190,
	} = props;

	const [open, setOpen] = useState(false);
	const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
	const triggerRef = useRef<View>(null);

	useImperativeHandle(ref, () => ({
		close: () => setOpen(false),
	}));

	const selectedLabel =
		options.find((o) => o.value === value)?.label ?? "";

	const handleTriggerPress = () => {
		triggerRef.current?.measureInWindow((x, y, width, height) => {
			setTriggerLayout({ x, y, width, height });
			setOpen((prev) => !prev);
		});
	};

	return (
		<>
			<DropdownTrigger
				ref={triggerRef}
				label={selectedLabel}
				placeholder={placeholder}
				disabled={disabled}
				style={style}
				isOpen={open}
				onPress={handleTriggerPress}
			/>
			<Portal>
				<DropdownList
					visible={open}
					value={value}
					options={options}
					triggerLayout={triggerLayout}
					width={128}
					maxHeight={maxHeight}
					dropdownStyle={dropdownStyle}
					optionStyle={optionStyle}
					onSelect={(v) => {
						onChange(v);
						setOpen(false);
					}}
				/>
			</Portal>
		</>
	);
});

export default Dropdown as <T>(
	props: Props<T> & { ref?: React.Ref<DropdownRef> }
) => React.ReactElement;
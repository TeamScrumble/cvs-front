import { colors, icons } from "@/constants";
import { useRef, useState } from "react";
import { LayoutRectangle, Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-iconify";
import TooltipWithPortal from "./TooltipWithPortal";

interface Props {
  content: string;
}

function TooltipWithIcon({ content }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipButtonLayout, setTooltipButtonLayout] =
    useState<LayoutRectangle | null>(null);
  const pressableRef = useRef<View>(null);

  const handleIconPress = () => {
    pressableRef.current?.measureInWindow((x, y, width, height) => {
      setTooltipButtonLayout({ x, y, width, height });
    });
    setIsOpen((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Pressable ref={pressableRef} onPress={handleIconPress}>
        <Icon icon={icons.info} size={12} color={colors.SLATE_800} />
      </Pressable>
      <TooltipWithPortal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={content}
        tooltipButtonLayout={tooltipButtonLayout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
});

export default TooltipWithIcon;

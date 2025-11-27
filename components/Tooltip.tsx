  import React, { useState } from "react";
  import { StyleSheet, View, Text } from "react-native";

  interface TooltipProps {
    content: string;
  }

  function Tooltip({ content }: TooltipProps) {
    const [tooltipHeight, setTooltipHeight] = useState(0);

    return (
      <View
        style={[styles.wrapper, { top: -(tooltipHeight + 4) }]}
        onLayout={(e) => {
          setTooltipHeight(e.nativeEvent.layout.height);
        }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{content}</Text>
        </View>
        <View style={styles.triangle} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    wrapper: {
      alignItems: "center",
      position: "absolute",
      minWidth: 100,
    },
    container: {
      backgroundColor: "#2C2C2C",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    text: {
      color: "#FFF",
      fontSize: 12,
    },
    triangle: {
      width: 0,
      height: 0,
      borderLeftWidth: 6,
      borderRightWidth: 6,
      borderTopWidth: 8,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: "#2C2C2C",
    },
  });

  export default Tooltip;

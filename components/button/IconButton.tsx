import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Icon from "react-native-iconify";

interface IconButtonProps {
  icon: string;
  size?: number;
  onPress?: () => void;
}

function IconButton({ icon, size = 24, onPress = () => {} }: IconButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <Icon icon={icon} size={size} />
    </Pressable>
  );
}

const styles = StyleSheet.create({

});

export default IconButton;

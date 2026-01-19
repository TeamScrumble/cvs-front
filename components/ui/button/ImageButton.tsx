import React from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet } from "react-native";

interface ImageButtonProps {
  source: ImageSourcePropType;
  size?: number;
  onPress?: () => void;
}

function ImageButton({ source, size = 24, onPress = () => {} }: ImageButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <Image source={source} style={{ width: size, height: size }} />
    </Pressable>
  );
}

const styles = StyleSheet.create({

});

export default ImageButton;

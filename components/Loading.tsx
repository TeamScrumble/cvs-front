import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Easing, Text } from "react-native";
import Character from "@/assets/images/character.svg";
import { colors, fonts } from "@/constants";

const Loading = () => {
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -10,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1.05,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.95,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === "..." ? "" : prev + "."));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateY }, { scale }],
        }}
      >
        <Character width={66} height={64} />
      </Animated.View>
      <Text style={styles.text}>로딩중{dots}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  text: {
    fontFamily: fonts.CHAB,
    fontSize: 16,
    color: colors.MAIN,
  }
})

export default Loading;
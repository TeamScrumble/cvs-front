import { fonts } from "@/constants";
import { StyleSheet, Text, View } from "react-native"

type Props = {
  color: string;
  backgroundColor: string;
  text: string;
}

const Badge = ({ color, backgroundColor, text }: Props) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 2,
  },
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 12,
  }
})

export default Badge;
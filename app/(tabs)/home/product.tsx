import { colors } from "@/constants";
import { StyleSheet, Text, View } from "react-native";

export default function ProductScreen() {
  return (
    <View style={styles.container}>
      <Text>상품 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { colors } from "@/constants";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StoreHeader from "@/components/home/StoreHeader";
import { isStore } from "@/@types";


export default function StoreScreen() {
  const { storeName } = useLocalSearchParams<{ storeName: string }>();

  // 유효하지 않은 편의점 이름일 경우 에러화면 렌더링해야함
  if (!isStore(storeName)) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StoreHeader store={storeName} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

import { isBrand } from "@/@types/brand";
import Header from "@/components/Header";
import { colors } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BrandScreen() {
  const { brandName } = useLocalSearchParams<{ brandName: string }>();

  // 유효하지 않은 편의점 이름일 경우 에러화면 렌더링해야함
  if (!isBrand(brandName)) return null;

  const handlePressBackButton = () => router.push("/home");

  return (
    <SafeAreaView style={styles.container}>
      <Header
        brandType={brandName}
        handlePressBackButton={handlePressBackButton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

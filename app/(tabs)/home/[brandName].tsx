import { BrandType, isBrand } from "@/@types/brand";
import Header from "@/components/layout/Header";
import { colors } from "@/constants";
import useGetProducts from "@/hooks/queries/product/useGetProducts";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BrandScreen() {
  const params = useLocalSearchParams();
  const rawBrand = Array.isArray(params.brandName)
    ? params.brandName[0]
    : params.brandName;
  const brand = isBrand(rawBrand) ? rawBrand : undefined;
  const { data, isLoading } = useGetProducts(brand as BrandType);

  if (isLoading) {
    return null; // 로딩 UI
  }

  if (!brand) {
    return null; // 에러 화면 가능
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        brandType={brand}
        handlePressBackButton={() => router.push("/home")}
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

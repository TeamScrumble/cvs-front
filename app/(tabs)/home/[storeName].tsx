import { colors, Stores } from "@/constants";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StoreHeader from "@/components/home/StoreHeader";


export default function StoreScreen() {
  const { storeName } = useLocalSearchParams();
  const name = Array.isArray(storeName) ? storeName[0] : storeName;
  const store: Stores = name as Stores;
  return (
    <SafeAreaView style={styles.container}>
      <StoreHeader store={store} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

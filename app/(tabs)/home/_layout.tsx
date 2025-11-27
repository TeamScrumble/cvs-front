import HomeTabBar from "@/components/home/HomeTabBar";
import { MaterialTopTabs } from "@/components/navigation/MaterialTopTabs";

export default function HomeLayout() {
  return (
    <MaterialTopTabs
      tabBar={(props) => <HomeTabBar {...props} />}
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: "편:편",
        }}
      />
      <MaterialTopTabs.Screen
        name="recipe"
        options={{
          title: "레시피",
        }}
      />
      <MaterialTopTabs.Screen
        name="product"
        options={{
          title: "상품",
        }}
      />
    </MaterialTopTabs>
  );
}
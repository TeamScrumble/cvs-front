import IconButton from "@/components/button/IconButton";
import { colors, icons } from "@/constants";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { NavigationRoute, ParamListBase } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeTabItem from "./HomeTabItem";

export default function HomeTabBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {

  const handlePress = (route: NavigationRoute<ParamListBase, string>, isFocused: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const buttonList = state.routes.map((route, index) => {
    const { options } = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
          ? options.title
          : route.name;

    const isFocused = state.index === index;

    return (
      <HomeTabItem
        key={route.key}
        label={label as string}
        isFocused={isFocused}
        onPress={() => handlePress(route, isFocused)}
      />
    );
  });

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.menuContainer}>
          {buttonList}
        </View>
        <View style={styles.iconContainer}>
          <IconButton icon={icons.search} />
          <IconButton icon={icons.alert} hasDot />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.WHITE,
  },
  headerContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});

import { colors, icons } from "@/constants";
import { Tabs } from "expo-router";
import React from "react";
import Icon from "react-native-iconify";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: colors.SLATE_500,
        tabBarActiveTintColor: colors.MAIN,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "홈",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              icon={focused ? icons.home : icons.homeOutline}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "검색",
          tabBarIcon: ({ color }) => (
            <Icon icon={icons.search} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="like"
        options={{
          title: "좋아요",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              icon={focused ? icons.heartFill : icons.heartLight}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "마이",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              icon={focused ? icons.person : icons.personOutline}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

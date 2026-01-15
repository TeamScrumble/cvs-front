import { BrandType } from "@/@types/brand";
import { PlusEventType } from "@/@types/event";
import { colors, fonts, icons } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../../button/IconButton";
import EventBadge from "./EventBadge";

interface DetailTitleProps {
  productTitle: string;
  productPrice: string;
  eventBadgeList?: { brand: BrandType; plusEvent: PlusEventType }[];
}

function DetailTitle({
  eventBadgeList = [],
  productTitle,
  productPrice,
}: DetailTitleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        <IconButton icon={icons.share} size={24} onPress={() => {}} />
        {eventBadgeList.map((v, i) => {
          return (
            <EventBadge
              key={`EventBadge_${i}`}
              brandType={v.brand}
              plusEventType={v.plusEvent}
            />
          );
        })}
      </View>
      <Text style={styles.text}>{productTitle}</Text>
      <Text style={styles.text}>{productPrice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  badgeContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 18,
    color: colors.SLATE_800,
  },
});

export default DetailTitle;

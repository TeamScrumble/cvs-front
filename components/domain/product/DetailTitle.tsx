import { BrandType } from "@/@types/brand";
import { PlusEventType } from "@/@types/event";
import Badge from "@/components/Badge";
import { colors, fonts, icons } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../../button/IconButton";
import EventBadge from "./EventBadge";

type Props = {
  productTitle: string;
  productPrice: string;
  eventBadgeList?: { brand: BrandType; plusEvent: PlusEventType }[];
  isNewProduct?: boolean;
  isDeleted?: boolean;
}

const DetailTitle = ({
  eventBadgeList = [],
  isNewProduct,
  isDeleted,
  productTitle,
  productPrice,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        <IconButton icon={icons.share} size={24} onPress={() => {}} />
        <View style={styles.badgeWrapper}>
          {isNewProduct && <Badge backgroundColor={colors.BACKGROUND} color={colors.MAIN} text="NEW" />}
          {isDeleted && <Badge backgroundColor={"#1A1A1AB3"} color={colors.WHITE} text="판매 종료" />}
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
  badgeWrapper: {
    flexDirection: "row",
    gap: 8,
  },
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 18,
    color: colors.SLATE_800,
  },
});

export default DetailTitle;

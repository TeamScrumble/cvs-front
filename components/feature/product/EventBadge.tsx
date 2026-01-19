import { BrandType } from "@/@types/brand";
import { PlusEventType } from "@/@types/event";
import Badge from "@/components/ui/Badge";
import { colors } from "@/constants";
import React from "react";

type EventBadgeProps = {
  brandType?: BrandType;
  plusEventType?: PlusEventType;
};

const badgeColors: Record<BrandType, Record<PlusEventType, string>> = {
  CU: {
    "1+1": colors.CU_GREEN,
    "2+1": colors.CU_PURPLE,
  },
  GS25: {
    "1+1": colors.GS_ORANGE,
    "2+1": colors.GS_GREEN,
  },
  SEVEN_ELEVEN: {
    "1+1": colors.SEVEN_ELEVEN_GREEN,
    "2+1": colors.SEVEN_ELEVEN_ORANGE,
  },
  EMART24: {
    "1+1": colors.EMART_YELLOW,
    "2+1": colors.EMART_DARK_GRAY,
  },
};

const EventBadge = ({
  brandType = "CU",
  plusEventType = "1+1",
}: EventBadgeProps) => {
  return (
    <Badge
      backgroundColor={badgeColors[brandType][plusEventType]}
      color={colors.WHITE}
      text={plusEventType}
    />
  );
};

export default EventBadge;

import React from "react";
import Seven_Icon from "@/assets/images/stores/7eleven_icon.svg";
import CU_Icon from "@/assets/images/stores/cu_icon.svg";
import Emart24_Icon from "@/assets/images/stores/emart24_icon.svg";
import GS25_Icon from "@/assets/images/stores/gs25_icon.svg";
import { BrandType } from "@/@types/brand";

interface BrandIconProps {
  brandType: BrandType;
}

const brandIcon: Record<BrandType, React.ReactNode> = {
  GS25: <GS25_Icon width={16} height={16} />,
  CU: <CU_Icon width={16} height={16} />,
  SEVEN_ELEVEN: <Seven_Icon width={16} height={16} />,
  EMART24: <Emart24_Icon width={16} height={16} />,
};

function BrandIcon({ brandType }: BrandIconProps) {
  return brandIcon[brandType];
}

export default BrandIcon;

import { colors, fonts } from "@/constants";
import { Portal } from "@gorhom/portal";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  LayoutRectangle,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TooltipProps extends ViewProps {
  content: string;
  isOpen: boolean;
  tooltipButtonLayout: LayoutRectangle | null;
  setIsOpen: (value: boolean) => void;
}

function TooltipWithPortal({
  content,
  isOpen,
  setIsOpen,
  tooltipButtonLayout,
  ...props
}: TooltipProps) {
  // 툴팁 자체의 크기를 저장
  const [tooltipSize, setTooltipSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const insets = useSafeAreaInsets();

  // 툴팁이 닫히면 사이즈 초기화 (재오픈 시 재계산을 위해)
  useEffect(() => {
    if (!isOpen) {
      setTooltipSize(null);
    }
  }, [isOpen]);

  // 렌더링 준비가 안 되었으면 아무것도 표시하지 않음 (단, 사이즈 측정을 위한 투명 렌더링은 필요할 수 있음)
  // 여기서는 사이즈 측정을 위해 일단 렌더링하되, 위치 계산 전에는 화면 밖이나 투명하게 처리
  if (!isOpen || !tooltipButtonLayout) return null;

  const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
  const { x: btnX, y: btnY, width: btnW, height: btnH } = tooltipButtonLayout;

  // 1. 위치 계산 로직
  let top = 0;
  let left = 0;
  let arrowLeft = 0;
  let isTop = true; // 툴팁이 버튼 위에 있는지 여부

  if (tooltipSize) {
    const ARROW_SIZE = 12; // 삼각형 너비
    const PADDING = 10; // 화면 가장자리 여백

    // 1. 수직 계산
    const spaceAbove = btnY - insets.top; // 버튼 위쪽 남은 공간

    // 위쪽 공간이 툴팁 높이보다 작으면 아래로 배치
    if (spaceAbove < tooltipSize.height) {
      isTop = false;
      top = btnY + btnH + tooltipSize.height / 2;
    } else {
      isTop = true;
      top = btnY - tooltipSize.height / 2;
    }

    // 2. 수평 계산
    const btnCenterX = btnX + btnW / 2;

    // 툴팁의 기본 Left: 버튼 중앙에 툴팁 중앙 맞추기
    left = btnCenterX - tooltipSize.width / 2;

    // 화면 좌측 이탈 방지
    if (left < PADDING) {
      left = PADDING;
    }
    // 화면 우측 이탈 방지
    else if (left + tooltipSize.width > windowWidth - PADDING) {
      left = windowWidth - tooltipSize.width - PADDING;
    }

    // 3. 화살표 위치 계산
    // 툴팁 박스 내부에서의 상대 좌표 (버튼 중앙을 가리켜야 함)
    arrowLeft = btnCenterX - left - ARROW_SIZE / 2;

    // 화살표가 툴팁 박스 모서리를 벗어나지 않도록 보정
    const ARROW_PADDING = 12; // 모서리 안전 거리
    if (arrowLeft < ARROW_PADDING) arrowLeft = ARROW_PADDING;
    if (arrowLeft > tooltipSize.width - ARROW_SIZE - ARROW_PADDING) {
      arrowLeft = tooltipSize.width - ARROW_SIZE - ARROW_PADDING;
    }
  }

  return (
    <Portal>
      {/* 배경 터치 시 닫기 */}
      <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
        <View style={StyleSheet.absoluteFill} />
      </TouchableWithoutFeedback>

      {/* 실제 툴팁 */}
      <View
        style={[
          styles.wrapper,
          // 사이즈 측정 전에는 투명하게 처리하여 깜빡임 방지
          tooltipSize ? { top, left, opacity: 1 } : { opacity: 0 },
        ]}
        onLayout={(e) => {
          setTooltipSize({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
          });
        }}
        {...props}
      >
        {/* 상단 배치 */}
        {isTop && (
          <>
            <View style={styles.container}>
              <Text style={styles.text}>{content}</Text>
            </View>
            <View
              style={[
                styles.triangle,
                styles.triangleDown,
                tooltipSize ? { left: arrowLeft } : {},
              ]}
            />
          </>
        )}

        {/* 하단 배치 */}
        {!isTop && (
          <>
            <View
              style={[
                styles.triangle,
                styles.triangleUp,
                tooltipSize ? { left: arrowLeft } : {},
              ]}
            />
            <View style={styles.container}>
              <Text style={styles.text}>{content}</Text>
            </View>
          </>
        )}
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
  },
  container: {
    maxWidth: 200,
    backgroundColor: colors.SLATE_800,
    padding: 8,
    borderRadius: 16,
  },
  text: {
    color: colors.WHITE,
    fontFamily: fonts.REGULAR,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    position: "relative",
  },
  triangleDown: {
    borderTopWidth: 8,
    borderTopColor: colors.SLATE_800,
    borderBottomWidth: 0,
  },
  triangleUp: {
    borderBottomWidth: 8,
    borderBottomColor: colors.SLATE_800,
    borderTopWidth: 0,
  },
});

export default TooltipWithPortal;
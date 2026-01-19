import { colors, fonts } from "@/constants";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  title?: string;
  content: string;
  confirmLabel?: string;
  onPressConfirm?: () => void;
  onClose: () => void;
}

const BaseModal = ({
  visible,
  title,
  content,
  confirmLabel = "확인",
  onPressConfirm = () => {},
  onClose,
}: Props) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.container}>
          <View style={styles.wrapper}>
            {title && <Text style={styles.titleText}>{title}</Text>}
            <Text style={styles.contentText}>{content}</Text>
          </View>
          <Pressable style={styles.buttonContainer} onPress={() => {
            onClose();
            onPressConfirm();
          }}>
            <Text style={styles.buttonLabel}>{confirmLabel}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 16,
    padding: 20,
  },
  wrapper: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 12,
  },
  titleText: {
    fontFamily: fonts.BOLD,
    fontSize: 16,
    lineHeight: 16 * 1,
    color: colors.NEUTRAL_DARK_DARKEST,
  },
  contentText: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    lineHeight: 14 * 1.5,
    letterSpacing: 14 * -0.02,
    color: colors.NEUTRAL_DARK_LIGHT,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: colors.MAIN,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonLabel: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 14,
    lineHeight: 14,
    color: colors.WHITE,
  },
});

export default BaseModal;

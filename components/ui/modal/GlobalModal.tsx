import { GlobalModalPayload } from "@/@types";
import { colors, fonts } from "@/constants";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../button/CustomButton";

type Props = {
  payload: GlobalModalPayload;
  onClose: () => void;
};

const GlobalModal = ({ payload, onClose }: Props) => {
  return (
    <Modal transparent animationType="fade">
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.container}>
          <View style={styles.wrapper}>
            {payload.title && (
              <Text style={styles.titleText}>{payload.title}</Text>
            )}
            <Text style={styles.contentText}>{payload.content}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {payload.cancelLabel && (
              <CustomButton
                label={payload.cancelLabel}
                onPress={() => {
                  onClose();
                  payload.onCancel?.();
                }}
                variant="border"
                containerStyle={styles.flexContainer}
              />
            )}
            <CustomButton
              label={payload.confirmLabel ?? "확인"}
              onPress={() => {
                onClose();
                payload.onConfirm?.();
              }}
              containerStyle={styles.flexContainer}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

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
    flexDirection: "row",
    gap: 8,
  },
  flexContainer: {
    flex: 1,
  },
});

export default GlobalModal;

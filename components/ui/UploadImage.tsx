import { colors, fonts, icons } from "@/constants";
import { getFormDataImages } from "@/utils/image";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-iconify";
import IconButton from "./button/IconButton";

type Props = {
  imageUri: string;
  onDeletePress: () => void;
};

function UploadImageItem({ imageUri, onDeletePress }: Props) {
  return (
    <View style={[styles.boxContainer, { position: "relative" }]}>
      <IconButton
        icon={icons.xCircleFill}
        size={16}
        color={colors.SLATE_700}
        onPress={onDeletePress}
        style={styles.deleteButton}
      />
      <Image style={styles.image} source={{ uri: imageUri }} />
    </View>
  );
}

function UploadImage() {
  const { control, setValue } = useFormContext();
  const [imageUris] = useWatch({ control, name: ["imageUris"] });

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 3) {
      Alert.alert("이미지 개수 초과", "추가 가능한 이미지는 최대 3개입니다.");
      return;
    }
    setValue("imageUris", [...imageUris, ...uris.map((uri) => ({ uri }))]);
  };

  const handleOpenImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: true,
    });

    if (result.canceled) return;

    const formData = getFormDataImages("images", result.assets);

    // todo
    // 1. 서버에 formData로 업로드
    // 2. 업로드된 이미지의 URL을 받아서 addImageUris에 전달
  };

  const handleDeleteImage = (index: number) => {
    setValue(
      "imageUris",
      (imageUris as string[]).filter((_, i) => i !== index),
    );
  };

  return (
    <View style={styles.container}>
      {(imageUris as string[]).map((uri, index) => {
        return (
          <UploadImageItem
            key={uri + index}
            imageUri={uri}
            onDeletePress={() => handleDeleteImage(index)}
          />
        );
      })}
      {imageUris.length < 3 && (
        <Pressable style={styles.boxContainer} onPress={handleOpenImagePick}>
          <Icon icon={icons.addRounded} size={24} color={colors.SLATE_500} />
          <Text style={styles.countText}>{`${imageUris.length}/3`}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flexDirection: "row",
  },
  boxContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.SLATE_200,
  },
  countText: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    color: colors.SLATE_300,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  deleteButton: {
    position: "absolute",
    zIndex: 1000,
    top: 2,
    right: 2,
  },
});

export default UploadImage;

import React from "react";
import { Image, StyleSheet } from "react-native";
import EmptyProfileImage from "@/assets/images/empty_profile.svg";

interface ProfileImageProps {
  profileUrl: string;
}

function ProfileImage({ profileUrl }: ProfileImageProps) {
  return (
    <>
      {profileUrl.length > 0 ? (
        <Image src={profileUrl} alt={profileUrl} style={styles.container} />
      ) : (
        <EmptyProfileImage style={styles.container} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default ProfileImage;

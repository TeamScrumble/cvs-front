import ImageButton from "@/components/button/ImageButton";
import BorderButton from "@/components/button/BorderButton";
import TextButton from "@/components/button/TextButton";
import { colors, fonts } from "@/constants";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.textButtonContainer}>
          <TextButton
            title="둘러보기"
            paddingHorizontal={12}
            color={colors.GRAY}
            onPress={() => router.push("/")}
          />
        </View>
        <View style={styles.logoContainer}>
          <Image source={require("@/assets/images/character.png")} width={66} />
          <Text
            style={{ fontFamily: "chab", color: colors.MAIN, fontSize: 40 }}
          >
            편:편
          </Text>
        </View>
        <View style={styles.loginIconContainer}>
          <ImageButton
            source={require("@/assets/images/login/kakao_login_icon.png")}
            size={54}
          />
          <ImageButton
            source={require("@/assets/images/login/naver_login_icon.png")}
            size={54}
          />
          <ImageButton
            source={require("@/assets/images/login/google_login_icon.png")}
            size={54}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.line} />
          <Text
            style={{ fontFamily: "regular", color: colors.GRAY, fontSize: 12 }}
          >
            또는
          </Text>
          <View style={styles.line} />
        </View>
        <View style={styles.roundButtonContainer}>
          <BorderButton
            title="이메일로 로그인"
            height={40}
            fontSize={14}
            fontFamily={fonts.SEMI_BOLD}
          />
        </View>
        <View style={styles.helpButtonContainer}>
          <TextButton
            title="로그인에 어려움이 있으신가요?"
            paddingHorizontal={12}
            fontSize={12}
            color={colors.GRAY}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  },
  textButtonContainer: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  logoContainer: {
    marginTop: 56,
    alignItems: "center",
  },
  loginIconContainer: {
    marginTop: 160,
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  textContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.GRAY,
    alignSelf: "center",
  },
  roundButtonContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  helpButtonContainer: {
    marginTop: 24,
    alignItems: "center",
  },
});

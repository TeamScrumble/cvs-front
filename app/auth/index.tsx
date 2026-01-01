import { LoginProvider } from "@/@types/dto";
import Character from "@/assets/images/character.svg";
import GoogleLoginIcon from "@/assets/images/login/google_login_icon.svg";
import KakaoLoginIcon from "@/assets/images/login/kakao_login_icon.svg";
import NaverLoginIcon from "@/assets/images/login/naver_login_icon.svg";
import CustomButton from "@/components/button/CustomButton";
import Tooltip from "@/components/tooltip/Tooltip";
import { colors, fonts } from "@/constants";
import { loginProvider } from "@/constants/login";
import { useAuthAction } from "@/hooks/queries/useAuth";
import { getSecureStore } from "@/utils/secureStore";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen() {
  const { socialLogin } = useAuthAction();
  const [lastLogin, setLastLogin] = useState<LoginProvider | null>(null);

  useEffect(() => {
    (async () => {
      const storedLastLogin = await getSecureStore("lastLogin");
      setLastLogin(storedLastLogin as LoginProvider | null);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="둘러보기"
          variant="standard"
          fontFamily={fonts.REGULAR}
          color={colors.GRAY}
          containerStyle={{
            paddingVertical: 12,
            paddingHorizontal: 10,
          }}
          onPress={() => router.push("/home")}
        />
      </View>
      <View style={styles.logoContainer}>
        <Character width={66} height={64} />
        <Text style={{ fontFamily: "chab", color: colors.MAIN, fontSize: 40 }}>
          편:편
        </Text>
      </View>
      <View style={styles.loginIconContainer}>
        <View style={styles.loginIconItem}>
          {lastLogin === loginProvider.KAKAO && (
            <Tooltip content="최근 로그인" />
          )}
          <KakaoLoginIcon
            width={54}
            height={54}
            onPress={() => socialLogin(loginProvider.KAKAO)}
          />
        </View>
        <View style={styles.loginIconItem}>
          {lastLogin === loginProvider.NAVER && (
            <Tooltip content="최근 로그인" />
          )}
          <NaverLoginIcon
            width={54}
            height={54}
            onPress={() => socialLogin(loginProvider.NAVER)}
          />
        </View>
        <View style={styles.loginIconItem}>
          {lastLogin === loginProvider.GOOGLE && (
            <Tooltip content="최근 로그인" />
          )}
          <GoogleLoginIcon
            width={54}
            height={54}
            onPress={() => socialLogin(loginProvider.GOOGLE)}
          />
        </View>
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
        {lastLogin === loginProvider.EMAIL && <Tooltip content="최근 로그인" />}
        <CustomButton
          label="이메일로 로그인"
          variant="border"
          color={colors.SLATE_800}
          bgColor={colors.WHITE}
          bdColor={colors.SLATE_200}
          containerStyle={{
            width: "100%",
            borderRadius: 100,
          }}
          onPress={() => {}}
        />
      </View>
      <View style={styles.helpButtonContainer}>
        <CustomButton
          label="로그인에 어려움이 있으신가요?"
          variant="standard"
          fontSize={12}
          fontFamily={fonts.REGULAR}
          color={colors.GRAY}
          containerStyle={{
            paddingVertical: 10,
            paddingHorizontal: 12,
          }}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  buttonContainer: {
    marginTop: 16,
    marginLeft: 12,
    alignItems: "flex-start",
  },
  logoContainer: {
    marginTop: 58,
    alignItems: "center",
  },
  loginIconContainer: {
    marginTop: 160,
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  loginIconItem: {
    position: "relative",
    alignItems: "center",
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
    alignItems: "center",
  },
  helpButtonContainer: {
    marginTop: 25,
    alignItems: "center",
  },
});

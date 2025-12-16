import { LoginProvider } from "@/@types/dto";
import Character from "@/assets/images/character.svg";
import GoogleLoginIcon from "@/assets/images/login/google_login_icon.svg";
import KakaoLoginIcon from "@/assets/images/login/kakao_login_icon.svg";
import NaverLoginIcon from "@/assets/images/login/naver_login_icon.svg";
import BorderButton from "@/components/button/BorderButton";
import TextButton from "@/components/button/TextButton";
import Tooltip from "@/components/tooltip/Tooltip";
import { colors, fonts } from "@/constants";
import { loginProvider } from "@/constants/login";
import useAuth from "@/hooks/queries/useAuth";
import { getSecureStore } from "@/utils/secureStore";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";

export default function AuthScreen() {
  const { socialLogin } = useAuth();
  const [lastLogin, setLastLogin] = useState<LoginProvider | null>(null);

  useEffect(() => {
    (async () => {
      const storedLastLogin = await getSecureStore("lastLogin");
      setLastLogin(storedLastLogin as LoginProvider | null);
    })();
  }, []);

  useEffect(() => {
    const sub = Linking.addEventListener("url", ({ url }) => {
      console.log("🔗 deep link received:", url);
    });

    return () => sub.remove();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.textButtonContainer}>
          <TextButton
            label="둘러보기"
            fontSize={14}
            pressableStyle={{ paddingHorizontal: 12 }}
            color={colors.GRAY}
            onPress={() => router.push("/(tabs)/home")}
          />
        </View>
        <View style={styles.logoContainer}>
          <Character width={66} height={64} />
          <Text
            style={{ fontFamily: "chab", color: colors.MAIN, fontSize: 40 }}
          >
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
        <View style={[styles.roundButtonContainer, styles.loginIconItem]}>
          {lastLogin === loginProvider.EMAIL && (
            <Tooltip content="최근 로그인" />
          )}
          <BorderButton
            title="이메일로 로그인"
            height={40}
            fontSize={14}
            fontFamily={fonts.SEMI_BOLD}
            onPress={() => {}}
          />
        </View>
        <View style={styles.helpButtonContainer}>
          <TextButton
            label="로그인에 어려움이 있으신가요?"
            pressableStyle={{ paddingHorizontal: 12 }}
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
  },
  helpButtonContainer: {
    marginTop: 25,
    alignItems: "center",
    paddingVertical: 10,
  },
});

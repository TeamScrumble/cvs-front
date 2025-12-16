import { colors, fonts, icons } from "@/constants";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import TextButton from "../button/TextButton";
import Divider from "../Divider";
import Icon from "react-native-iconify";

function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ gap: 8, alignItems: "center" }}>
        <View
          style={{
            gap: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextButton label="고객센터" fontSize={12} textStyle={styles.text} />
          <Divider isVertical style={{ height: 10 }} />
          <TextButton label="이용약관" fontSize={12} textStyle={styles.text} />
          <Divider isVertical style={{ height: 10 }} />
          <TextButton
            label="개인정보처리방침"
            fontSize={12}
            textStyle={{
              fontFamily: fonts.BOLD,
              lineHeight: 12,
              color: colors.SLATE_800,
            }}
          />
        </View>
        <TextButton label="청소년보호정책" textStyle={styles.text} />
      </View>
      <View style={{ gap: 20 }}>
        <View style={{ gap: 10 }}>
          <Pressable
            style={{ gap: 10, flexDirection: "row", alignItems: "center" }}
            onPress={() => setIsOpen((prev) => !prev)}
          >
            <Text style={styles.subText}>편편 사업자 정보</Text>
            <Icon
              icon={isOpen ? icons.expandLess : icons.expandMore}
              size={10}
              color={colors.SLATE_500}
            />
          </Pressable>
          {isOpen && (
            <View style={{ gap: 4 }}>
              <Text style={styles.subText}>대표이사: 편의점</Text>
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <Text style={styles.subText}>
                  사업자등록번호 : 000-00-00000
                </Text>
                <TextButton
                  label="사업자정보 확인"
                  textStyle={styles.underLineText}
                />
              </View>
              <Text style={styles.subText}>
                통신판매업 신고 : 제 2025-경기하남-1209호
              </Text>
              <Text style={styles.subText}>
                주소 : 경기도 하남시 편리해 12길 3, 20층 25호
              </Text>
            </View>
          )}
        </View>
        <Text style={[styles.subText, { color: colors.SLATE_400 }]}>
          Copyright ⓒ PyeonPyeon All Rights Reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    boxSizing: "border-box",
    height: 230,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 56,
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: colors.SLATE_200,
  },
  text: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    color: colors.SLATE_800,
  },
  subText: {
    fontFamily: fonts.REGULAR,
    fontSize: 10,
    color: colors.SLATE_500,
  },
  underLineText: {
    fontFamily: fonts.REGULAR,
    fontSize: 10,
    color: colors.SLATE_500,
    textDecorationLine: "underline",
  },
});

export default Footer;

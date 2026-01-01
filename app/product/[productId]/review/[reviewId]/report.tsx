import { colors, fonts, icons } from "@/constants";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-iconify";
import TextArea from "@/components/textArea/TextArea";
import { FormProvider, useForm } from "react-hook-form";
import { isBlank, maxLength, minLength } from "@/rules";
import { router, useLocalSearchParams } from "expo-router";
import RadioSentence from "@/components/radioSentence/RadioSentence";
import BaseModal from "@/components/modal/BaseModal";
import { toPositiveInt } from "@/utils";
import useGetReviewReportReason from "@/hooks/queries/review/useGetReviewReportReason";
import useCreateReviewReport from "@/hooks/queries/review/useCreateReviewReport";
import CustomButton from "@/components/button/CustomButton";

type FormValues = {
  reasonCode: string;
  content: string;
};

function ReportScreen() {
  const { data } = useGetReviewReportReason();
  const { productId, reviewId } = useLocalSearchParams<{
    productId: string;
    reviewId: string;
  }>();

  const createReport = useCreateReviewReport();
  const reviewIdNum = toPositiveInt(reviewId);
  const productIdNum = toPositiveInt(productId);
  const [modalOpen, setModalOpen] = useState(false);
  const reporForm = useForm<FormValues>({
    defaultValues: {
      reasonCode: "",
      content: "",
    },
  });

  useEffect(() => {
    if (createReport.isSuccess) {
      setModalOpen(true);
    }
  }, [createReport.isSuccess]);

  const onSubmit = (formValues: FormValues) => {
    createReport.mutate({
      reviewId: reviewIdNum,
      request: formValues
    });
  };

  // 유효하지 않은 id값의 경우 에러화면 띄워야함
  if (productIdNum === null || reviewIdNum === null) return null;

  return (
    <FormProvider {...reporForm}>
      <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
        <ScrollView style={{ flexGrow: 1 }}>
          {/* 안내 */}
          <View style={styles.infoSection}>
            <View style={styles.infoContainer}>
              <Icon icon={icons.info} size={12} color={colors.MAIN} />
              <Text style={styles.infoText}>
                신고된 후기는 관리자의 검토 후 비공개될 수 있습니다.
              </Text>
            </View>
          </View>
          {/* 신고 사유 및 내용 */}
          <View style={styles.inputSection}>
            <Text style={styles.labelText}>신고 사유</Text>
            {data && (
              <RadioSentence
                name="reasonCode"
                rules={{
                  validate: (data: string) => {
                    if (isBlank(data)) return "신고 사유를 선택해주세요.";
                  },
                }}
                options={data.map((v) => ({
                  label: v.description,
                  value: v.reasonCode,
                }))}
              />
            )}
            <Text style={styles.labelText}>신고 내용</Text>
            <TextArea
              name="content"
              numberOfLines={5}
              placeholder="욕설, 허위 내용, 무관한 사진 등 신고 사유를 구체적으로 작성해주세요."
              rules={{
                validate: (data: string) => {
                  if (minLength(data, 10) || maxLength(data, 500))
                    return "신고 내용을 10~500자 사이로 작성해주세요.";
                },
              }}
            />
          </View>
        </ScrollView>
        {/* 푸터 */}
        <View style={styles.footerContainer}>
          <CustomButton
            label="취소"
            variant="border"
            containerStyle={{ flex: 1 }}
            onPress={() => router.back()}
          />
          <CustomButton
            label="신고"
            containerStyle={{ flex: 1 }}
            onPress={reporForm.handleSubmit(onSubmit)}
          />
        </View>
        <BaseModal
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
          title="신고가 접수되었어요."
          content="검토 후 정책 위반 후기는 비공개 처리되며, 필요 시 추가 조치가 진행됩니다."
          onPressConfirm={() => router.push(`/product/${productIdNum}`)}
        />
      </SafeAreaView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  infoSection: {
    padding: 20,
  },
  infoContainer: {
    padding: 12,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.SLATE_50,
    borderRadius: 6,
  },
  infoText: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    color: colors.SLATE_500,
  },
  inputSection: {
    padding: 20,
    gap: 20,
  },
  labelText: {
    fontFamily: fonts.BOLD,
    fontSize: 14,
    lineHeight: 14,
    color: colors.SLATE_800,
  },
  footerContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
    borderTopColor: colors.SLATE_200,
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 16,
  },
});

export default ReportScreen;

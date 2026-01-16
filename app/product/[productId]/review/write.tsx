import CustomButton from "@/components/button/CustomButton";
import ProductSummary from "@/components/domain/review/write/ProductSummary";
import Radio from "@/components/radio/Radio";
import TextArea from "@/components/textArea/TextArea";
import UploadImage from "@/components/UploadImage";
import { colors, fonts } from "@/constants";
import useCreateReview from "@/hooks/queries/review/useCreateReview";
import useGetReviewAspectInfo from "@/hooks/queries/review/useGetReviewAspectInfo";
import { maxLength, minLength } from "@/rules";
import { toPositiveInt } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

type FormValues = {
  rating: number;
  aspects: number[];
  content: string;
  imageUris: string[];
  hasReceipt: boolean;
};

function ReviewWriteScreen() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const productIdNum = toPositiveInt(productId);
  const { data: aspectInfo } = useGetReviewAspectInfo();
  const createReviewMutation = useCreateReview(productIdNum);

  const reviewForm = useForm<FormValues>({
    defaultValues: {
      rating: 0,
      aspects: Array(aspectInfo?.length).fill(0),
      content: "",
      imageUris: [],
      hasReceipt: false,
    },
  });

  const onSubmit = (formValues: FormValues) => {
    if (!aspectInfo) return;

    createReviewMutation.mutate({
      productId: productIdNum,
      rating: formValues.rating,
      content: formValues.content,
      scores: formValues.aspects.map((v, i) => ({
        aspectId: aspectInfo[i].aspectId,
        optionId: v,
      })),
      isReceipt: formValues.hasReceipt,
      images: formValues.imageUris.map((v, i) => ({
        imgUrl: v,
        displayOrder: i + 1,
      })),
    });
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <FormProvider {...reviewForm}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          extraScrollHeight={200}
          keyboardShouldPersistTaps="handled"
        >
          {/* 상품 요약 정보 및 별점 평가 */}
          <ProductSummary productId={productIdNum} />
          {/* 구분선 */}
          <View style={{ backgroundColor: colors.GRAY_50_TINT, height: 8 }} />
          {/* 객관식 평가 */}
          {aspectInfo?.map((v, i) => {
            return (
              <Radio
                key={v.aspectId}
                name={`aspects.${i}`}
                label={v.aspectQuestion}
                options={v.options.map((op) => ({
                  label: op.optionText,
                  value: op.optionId,
                }))}
                rules={{
                  validate: (data: number) => {
                    if (data < 1) return "blank error";
                  },
                }}
              />
            );
          })}
          {/* 후기 작성 */}
          <View style={{ gap: 20, padding: 20 }}>
            <Text style={styles.labelText}>어떤 점이 좋았나요?</Text>
            <TextArea
              name="content"
              placeholder="10~500자의 상품 후기를 작성해주세요."
              rules={{
                validate: (data: string) => {
                  if (minLength(data, 10) || maxLength(data, 500))
                    return "후기는 10~500자 사이로 작성해주세요.";
                },
              }}
            />
          </View>
          {/* 사진 첨부 */}
          <View style={styles.imageUploadContainer}>
            <Text style={styles.labelText}>사진 첨부</Text>
            <UploadImage />
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                • 사진은 10MB 이하의 JPG, PNG만 업로드할 수 있습니다.
              </Text>
              <Text style={styles.infoText}>
                • 상품과 무관한 후기는 사전 안내 없이 삭제될 수 있습니다.
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.footerContainer}>
          <CustomButton
            label="후기 등록"
            onPress={reviewForm.handleSubmit(onSubmit)}
          />
        </View>
      </FormProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  labelText: {
    fontFamily: fonts.BOLD,
    fontSize: 14,
    lineHeight: 14,
    color: colors.SLATE_800,
  },
  imageUploadContainer: {
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 56,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    justifyContent: "center",
    backgroundColor: colors.SLATE_50,
    borderRadius: 6,
  },
  infoText: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 12,
    color: colors.SLATE_500,
  },
  footerContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
    borderTopColor: colors.SLATE_200,
    borderTopWidth: 1,
  },
  footerButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.MAIN,
    alignItems: "center",
  },
  footerButtonText: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 14,
    lineHeight: 14,
    color: colors.WHITE,
  },
});

export default ReviewWriteScreen;

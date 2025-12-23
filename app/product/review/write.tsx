import TextButton from "@/components/button/TextButton";
import ProductSummary from "@/components/domain/review/write/ProductSummary";
import Radio from "@/components/radio/Radio";
import TextArea from "@/components/textArea/TextArea";
import UploadImage from "@/components/UploadImage";
import { colors, fonts } from "@/constants";
import { isBlank, maxLength, minLength } from "@/rules";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

type FormValues = {
  rating: number;
  quality: string;
  cost: string;
  repurchase: string;
  review: string;
  imageUris: string[];
};

function ReviewWriteScreen() {
  const reviewForm = useForm<FormValues>({
    defaultValues: {
      rating: 5,
      quality: "",
      cost: "",
      repurchase: "",
      review: "",
      imageUris: ["https://m.cookieall.com/web/product/medium/202312/f3c1ceed50876e02d43c117c420bc159.jpg"],
    },
  });

  const handlePressStar = (value: number) =>
    reviewForm.setValue("rating", value);

  const onSubmit = (formValues: FormValues) => {
    console.log("formValues:", formValues);
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
          <ProductSummary
            brandType="CU"
            productName="오리온)눈을감자칠리치즈"
            rating={reviewForm.watch().rating}
            handlePressStar={handlePressStar}
          />
          {/* 구분선 */}
          <View style={{ backgroundColor: colors.GRAY_50_TINT, height: 8 }} />
          {/* 객관식 평가 */}
          <Radio
            name="quality"
            label="품질이 어떠셨나요?"
            options={[
              { label: "최고예요", value: "최고예요" },
              { label: "괜찮아요", value: "괜찮아요" },
              { label: "별로예요", value: "별로예요" },
            ]}
            rules={{
              validate: (data: string) => {
                if (isBlank(data)) return "blank error";
              },
            }}
          />
          <Radio
            name="cost"
            label="가격이 어떠셨나요?"
            options={[
              { label: "최고예요", value: "최고예요" },
              { label: "그냥 그래요", value: "그냥 그래요" },
              { label: "별로예요", value: "별로예요" },
            ]}
            rules={{
              validate: (data: string) => {
                if (isBlank(data)) return "blank error";
              },
            }}
          />
          <Radio
            name="repurchase"
            label="재구매의사가 있으신가요?"
            options={[
              { label: "완전 있어요", value: "완전 있어요" },
              { label: "모르겠어요", value: "모르겠어요" },
              { label: "전혀 없어요", value: "전혀 없어요" },
            ]}
            rules={{
              validate: (data: string) => {
                if (isBlank(data)) return "blank error";
              },
            }}
          />
          {/* 후기 작성 */}
          <View style={{ gap: 20, padding: 20 }}>
            <Text style={styles.labelText}>어떤 점이 좋았나요?</Text>
            <TextArea
              name="review"
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
          <TextButton
            label="후기 등록"
            pressableStyle={styles.footerButton}
            textStyle={styles.footerButtonText}
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

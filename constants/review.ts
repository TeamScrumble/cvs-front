export enum REVIEW_SORT_TYPE {
  RECOMMENDED = "RECOMMENDED",
  LATEST = "LATEST",
  RATING_HIGH = "RATING_HIGH",
  RATING_LOW = "RATING_LOW",
  MOST_HELPFUL = "MOST_HELPFUL",
}

export const REVIEW_ORDER_OPTIONS = [
  {
    label: "추천순",
    value: REVIEW_SORT_TYPE.RECOMMENDED,
    tooltip:
      "최신성, 도움돼요 수, 사진 첨부 여부를 종합 점수로 계산해 높은 순으로 정렬합니다.",
  },
  { label: "최신순", value: REVIEW_SORT_TYPE.LATEST },
  { label: "별점 높은 순", value: REVIEW_SORT_TYPE.RATING_HIGH },
  { label: "별점 낮은 순", value: REVIEW_SORT_TYPE.RATING_LOW },
  { label: "도움돼요 순", value: REVIEW_SORT_TYPE.MOST_HELPFUL },
];

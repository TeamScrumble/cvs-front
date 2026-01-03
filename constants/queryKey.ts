const queryKeys = {
  AUTH: "auth",
  GET_ME: "getMe",
  PRODUCT: "product",
  GET_PRODUCTS: "getProducts",
  GET_PRODUCT: "getProduct",
  REVIEW: "review",
  GET_ASPECTINFO: "getAspectInfo",
  GET_REPORT_REASON: "getReportReason",
  GET_REVEIW_SUMMARY: "getReviewSummary",
  GET_REVIEWS: "getReviews",
  REVIEW_IMAGE_ONLY: (b: boolean) => `reviewImageOnly-${b}`,
  REVIEW_RECEIPT_ONLY: (b: boolean) => `reviewReceiptOnly-${b}`,
};

export { queryKeys };

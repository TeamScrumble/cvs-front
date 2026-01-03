import { CR } from "@/@types/dto";
import { https } from "./axios";
import { Aspect, ReportReason, Review } from "@/@types/review";
import {
  CreateReviewReportRequest,
  CreateReviewRequest,
  GetReviewsRequest,
  GetReviewSummaryDTO,
} from "@/@types/dto/reviewDto";

const getReviews = async ({productId, page, pageSize, filter }: GetReviewsRequest) => {
  console.log("[getReviews] start!");

  const { data } = await https.get<CR<Review[]>>("/api/product/review", {
    params: {
      productId,
      page,
      pageSize,
      receiptOnly: filter.receiptOnly,
      imageOnly: filter.imageOnly,
      sort: filter.sort,
    }
  });

  console.log("[getReviews] data:", data);

  return data.body;
};

const getReviewSummary = async (productId: number) => {
  const { data } = await https.get<CR<GetReviewSummaryDTO>>("/api/product/review/summary", {
    params: { productId }
  });

  return data.body;
};

const getReviewReportReason = async () => {
  const { data } = await https.get<CR<ReportReason[]>>(
    "/api/product/review/report/reason"
  );

  return data.body;
};

const getReviewAspectInfo = async () => {
  const { data } = await https.get<CR<Aspect[]>>(
    "/api/product/review/aspectInfo"
  );

  return data.body;
};

const createReview = async (request: CreateReviewRequest) => {
  const { data } = await https.post<CR<{ reviewId: number }>>(
    "/api/product/review",
    request
  );

  return data.body;
};

const createReviewReport = async ({
  reviewId,
  request,
}: {
  reviewId: number;
  request: CreateReviewReportRequest;
}) => {
  const { data } = await https.post<CR<{ reportId: number }>>(
    `/api/product/review/${reviewId}/report`,
    request
  );

  return data.body;
};

export {
  getReviews,
  getReviewSummary,
  getReviewAspectInfo,
  getReviewReportReason,
  createReview,
  createReviewReport,
};

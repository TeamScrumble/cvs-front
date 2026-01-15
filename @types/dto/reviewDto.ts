import { ReviewFilter } from "../review";

export type CreateReviewRequest = {
  productId: number;
  rating: number;
  content: string;
  isReceipt: boolean;
  scores: {
    aspectId: number;
    optionId: number;
  }[];
  images: {
    imgUrl: string;
    displayOrder: number;
  }[];
};

export type CreateReviewReportRequest = {
  reasonCode: string;
  content: string;
}

export type GetReviewSummaryDTO = {
  totalCount: number;
  receiptCount: number;
  averageRating: number;
  aspects: {
    aspectId: number;
    title: string;
    question: string;
    options: {
      optionId: number;
      optionText: string;
      count: number;
    }[];
  }[];
}

export type GetReviewsRequest = {
  productId: number;
  page: number;
  filter: ReviewFilter;
  pageSize?: number;
}

export type LikeReviewDTO = {
  liked: boolean;
  likeCount: number;
}
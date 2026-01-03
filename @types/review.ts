import { REVIEW_SORT_TYPE } from "@/constants/review";

export type Option = {
  optionId: number;
  optionText: string;
  displayOrder: number;
}

export type Aspect = {
  aspectId: number;
  aspectTitle: string;
  aspectQuestion: string;
  options: Option[];
}

export type ReportReason = {
  reasonCode: string;
  description: string;
}

export type Review = {
  reviewId: number;
  memberId: number;
  nickname: string;
  profileImage: string;
  rating: number;
  content: string;
  likeCount: number;
  isLikeByMe: boolean;
  lastModifiedAt: string;
  scores: {
    aspectId: number;
    optionId: number;
    aspectTitle: string;
    optionName: string;
  }[];
  imgList: string[];
}

export type ReviewFilter = {
  receiptOnly: boolean;
  imageOnly: boolean;
  sort: REVIEW_SORT_TYPE;
}
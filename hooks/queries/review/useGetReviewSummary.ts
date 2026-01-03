import { getReviewSummary } from "@/api/review";
import { queryKeys } from "@/constants/queryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetReviewSummary = (productId: number) => {
  return useSuspenseQuery({
    queryFn: () => getReviewSummary(productId),
    queryKey: [queryKeys.REVIEW, queryKeys.GET_REVEIW_SUMMARY, productId],
    staleTime: 1000 * 60
  });
};

export default useGetReviewSummary;
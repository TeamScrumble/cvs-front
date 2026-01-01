import { getReviewSummary } from "@/api/review";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const useGetReviewSummary = (productId: number) => {
  return useQuery({
    queryFn: () => getReviewSummary(productId),
    queryKey: [queryKeys.REVIEW, queryKeys.GET_REVEIW_SUMMARY, productId],
    enabled: Boolean(productId),
    staleTime: 1000 * 60
  });
};

export default useGetReviewSummary;

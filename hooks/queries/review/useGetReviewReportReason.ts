import { getReviewReportReason } from "@/api/review";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const useGetReviewReportReason = () => {
  return useQuery({
    queryFn: () => getReviewReportReason(),
    queryKey: [queryKeys.REVIEW, queryKeys.GET_REPORT_REASON],
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useGetReviewReportReason;

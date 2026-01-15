import { getReviewAspectInfo } from "@/api/review";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const useGetReviewAspectInfo = () => {
  return useQuery({
    queryFn: () => getReviewAspectInfo(),
    queryKey: [queryKeys.REVIEW, queryKeys.GET_ASPECTINFO],
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default useGetReviewAspectInfo;

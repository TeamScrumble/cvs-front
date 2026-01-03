import { ReviewFilter } from "@/@types/review";
import { getReviews } from "@/api/review";
import { queryKeys } from "@/constants/queryKey";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetInfiniteReviews = (productId: number, filter: ReviewFilter) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getReviews({
        productId,
        page: pageParam,
        pageSize: 10,
        filter,
      }),
    queryKey: [
      productId,
      queryKeys.REVIEW,
      queryKeys.GET_REVIEWS,
      filter.imageOnly,
      filter.receiptOnly,
      filter.sort,
    ],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const lastReview = lastPage[lastPage.length - 1];
      return lastReview ? allPages.length + 1 : undefined;
    },
    staleTime: 30 * 1000,
  });
};

export default useGetInfiniteReviews;

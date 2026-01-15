import { InfiniteData, useMutation } from "@tanstack/react-query";
import { Review, ReviewFilter } from "@/@types/review";
import queryClient from "@/api/queryClient";
import { addReviewLike } from "@/api/review";
import { queryKeys } from "@/constants/queryKey";

const useAddReviewLike = (productId: number, filter: ReviewFilter) => {
  const queryKey = [
    productId,
    queryKeys.REVIEW,
    queryKeys.GET_REVIEWS,
    filter.imageOnly,
    filter.receiptOnly,
    filter.sort,
  ];

  return useMutation({
    mutationFn: addReviewLike,
    onMutate: async (reviewId: number) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<InfiniteData<Review[]>>(queryKey);

      if (!previousData) return { previousData };

      const newData: InfiniteData<Review[]> = {
        ...previousData,
        pages: previousData.pages.map((page) =>
          page.map((review) =>
            review.reviewId === reviewId
              ? {
                  ...review,
                  isLikeByMe: true,
                  likeCount: review.likeCount + 1,
                }
              : review
          )
        ),
      };

      queryClient.setQueryData(queryKey, newData);

      return { previousData };
    },

    onError: (_err, _reviewId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export default useAddReviewLike;

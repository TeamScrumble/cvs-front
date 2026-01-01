import queryClient from "@/api/queryClient";
import { createReview } from "@/api/review";
import { queryKeys } from "@/constants/queryKey";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

const useCreateReview = (productId: number) => {
  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.REVIEW, queryKeys.GET_REVEIW_SUMMARY, productId],
      });
      router.replace(`/product/${productId}`);
    },
    onError: () => {},
  });
};

export default useCreateReview;

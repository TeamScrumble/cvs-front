import { createReviewReport } from "@/api/review";
import { useMutation } from "@tanstack/react-query";

const useCreateReviewReport = () => {
  return useMutation({
    mutationFn: createReviewReport,
    onSuccess: () => {
      console.log("CreateReviewReport mutate Success");
    },
    onError: () => {
      console.log("CreateReviewReport mutate Error");
    },
  });
};

export default useCreateReviewReport;

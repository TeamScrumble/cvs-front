import { getProduct } from "@/api/product";
import { queryKeys } from "@/constants/queryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetProduct = (productId: number) => {
  return useSuspenseQuery({
    queryFn: () => getProduct(productId),
    queryKey: [queryKeys.PRODUCT, queryKeys.GET_PRODUCT, productId],
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetProduct;

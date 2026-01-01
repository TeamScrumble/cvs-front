import { getProduct } from "@/api/product";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const useGetProduct = (productId: number) => {
  return useQuery({
    queryFn: () => getProduct(productId),
    queryKey: [queryKeys.PRODUCT, queryKeys.GET_PRODUCT, productId],
    enabled: Boolean(productId),
  });
};

export default useGetProduct;

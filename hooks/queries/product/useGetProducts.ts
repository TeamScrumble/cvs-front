import { BrandType } from "@/@types/brand";
import { getProducts } from "@/api/product";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const useGetProducts = (cvsTarget: BrandType) => {
  return useQuery({
    queryFn: () => getProducts(cvsTarget),
    queryKey: [queryKeys.PRODUCT, queryKeys.GET_PRODUCTS, cvsTarget],
    enabled: Boolean(cvsTarget),
  })
}

export default useGetProducts;
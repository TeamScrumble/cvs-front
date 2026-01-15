import { GetProductDTO } from "@/@types/dto/productDto";
import { likeProduct } from "@/api/product";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants/queryKey";
import { useMutation } from "@tanstack/react-query";

const useLikeProduct = () => {
  return useMutation({
    mutationFn: likeProduct,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.PRODUCT, queryKeys.GET_PRODUCT, productId],
      });

      const previousProduct = queryClient.getQueryData<GetProductDTO>([
        queryKeys.PRODUCT,
        queryKeys.GET_PRODUCT,
        productId,
      ]);

      const newProduct = { ...previousProduct } as GetProductDTO;
      if (previousProduct?.isLiked) {
        newProduct.isLiked = false;
        newProduct.product.likeCount--;
      } else {
        newProduct.isLiked = true;
        newProduct.product.likeCount++;
      }

      queryClient.setQueryData(
        [queryKeys.PRODUCT, queryKeys.GET_PRODUCT, productId],
        newProduct
      );

      return { previousProduct, newProduct };
    },
    onError: (err, variables, result, context) => {
      queryClient.setQueryData(
        [
          queryKeys.PRODUCT,
          queryKeys.GET_PRODUCT,
          result?.previousProduct?.product.productId,
        ],
        result?.previousProduct
      );
    },
    onSettled: (data, error, variables, result, context) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRODUCT, queryKeys.GET_PRODUCT, variables],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRODUCT, queryKeys.GET_PRODUCTS],
      });
    },
  });
};

export default useLikeProduct;

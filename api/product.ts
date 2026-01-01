import { CR } from "@/@types/dto";
import { https } from "./axios";
import {
  GetProductDTO,
  GetProductsDTO,
  LikeProductDTO,
} from "@/@types/dto/productDto";
import { BrandType } from "@/@types/brand";

const getProducts = async (cvsTarget: BrandType) => {
  console.log("getProducts called!");
  console.log("cvsTarget: ", cvsTarget);

  const { data } = await https.get<CR<GetProductsDTO>>("/api/product", {
    data: { cvsTarget },
  });

  console.log(data);

  return data.body;
};

const getProduct = async (productId: number) => {
  const { data } = await https.get<CR<GetProductDTO>>(
    `/api/product/${productId}`
  );

  return data.body;
};

const likeProduct = async (productId: number) => {
  const { data } = await https.post<CR<LikeProductDTO>>(`/api/product/like`, {
    productId,
  });

  return data.body;
};

export { getProducts, getProduct, likeProduct };

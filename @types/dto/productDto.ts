import { Product } from "../product"

export type GetProductsDTO = {
  product: Product[];
}

export type GetProductDTO = {
  product: Product;
  isLiked: boolean;
}

export type LikeProductDTO = {
  liked: boolean;
  likeCount: number;
}
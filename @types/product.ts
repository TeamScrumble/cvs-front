import { BrandType } from "./brand";
import { PlusEventType } from "./event";

export type Product = {
  productId: number;
  cvsProductId: number;
  cvsTarget: BrandType;
  title: string;
  img: string;
  price: number;
  event: PlusEventType;
  isNewProduct: boolean;
  likeCount: number;
  isDeleted: boolean;
}
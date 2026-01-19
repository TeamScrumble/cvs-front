import SafeImage from "@/components/ui/image/SafeImage";
import useGetProduct from "@/hooks/queries/product/useGetProduct";
import { View } from "react-native";
import ProductTitle from "./ProductTitle";

type Props = {
  productId: number;
};

const ProductSection = ({ productId }: Props) => {
  const { data } = useGetProduct(productId);

  return (
    <View style={{ gap: 16 }}>
      <SafeImage uri={data.product.img} showErrorResult />
      {/* 상세 화면 타이틀 */}
      {data && (
        <ProductTitle
          productTitle={data.product.title || ""}
          productPrice={`${data.product.price.toLocaleString()}원`}
          eventBadgeList={[
            {
              brand: data.product.cvsTarget,
              plusEvent: data.product.event,
            },
          ]}
          isNewProduct={data.product.isNewProduct}
          isDeleted={data.product.isDeleted}
        />
      )}
    </View>
  );
};

export default ProductSection;

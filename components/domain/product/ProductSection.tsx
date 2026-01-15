import useGetProduct from "@/hooks/queries/product/useGetProduct";
import { View } from "react-native";
import DetailTitle from "./DetailTitle";
import SafeImage from "@/components/image/SafeImage";

type Props = {
  productId: number;
}

const ProductSection = ({ productId }: Props) => {
  const { data: product } = useGetProduct(productId);

  return (
    <View style={{ gap: 16 }}>
      <SafeImage 
        uri={product.product.img} 
        showErrorResult
      />
      {/* 상세 화면 타이틀 */}
      {product && (
        <DetailTitle
          productTitle={product.product.title || ""}
          productPrice={`${product.product.price.toLocaleString()}원`}
          eventBadgeList={[
            {
              brand: product.product.cvsTarget,
              plusEvent: product.product.event,
            },
          ]}
        />
      )}
    </View>
  )
}

export default ProductSection;
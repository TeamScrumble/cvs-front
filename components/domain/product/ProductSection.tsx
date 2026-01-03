import EmptyImage from "@/components/EmptyImage";
import useGetProduct from "@/hooks/queries/product/useGetProduct";
import { Image, View } from "react-native";
import DetailTitle from "./DetailTitle";

type Props = {
  productId: number;
}

const ProductSection = ({ productId }: Props) => {
  const { data: product } = useGetProduct(productId);
  return (
    <View>
      <View style={{ alignSelf: "center" }}>
        {product?.product.img ? (
          <Image
            src={product?.product.img}
            alt={"product img"}
            width={320}
            height={320}
          />
        ) : (
          <EmptyImage />
        )}
      </View>
      {/* 상세 화면 타이틀 */}
      {
        product && (
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
        )
      }
    </View>
  )
}

export default ProductSection;
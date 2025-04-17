
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductGridSkeleton = () => {
  // Show more skeletons on larger screens to better match the grid layout
  const skeletonCount = 8;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
      {Array(skeletonCount)
        .fill(0)
        .map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
    </div>
  );
};

export default ProductGridSkeleton;


import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <div className="overflow-hidden mb-3">
        <Skeleton className="w-full aspect-[3/4]" />
      </div>
      <div className="px-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <div className="mt-4 px-1">
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

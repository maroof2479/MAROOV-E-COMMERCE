
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Product Images Skeleton */}
      <div>
        <div className="mb-4">
          <Skeleton className="w-full aspect-square rounded-lg" />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-md" />
            ))}
        </div>
      </div>
      
      {/* Product Info Skeleton */}
      <div>
        <div className="mb-6 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-20" />
        </div>
        
        <Skeleton className="h-20 w-full mb-6" />
        
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Skeleton className="h-10 w-32 mr-4" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex space-x-2">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} className="h-10 w-24" />
              ))}
          </div>
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;

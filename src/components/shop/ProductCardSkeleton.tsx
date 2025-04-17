
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card className="product-card-skeleton border-none shadow-none">
      <div className="overflow-hidden mb-3">
        <Skeleton className="w-full aspect-[3/4]" />
      </div>
      <CardContent className="px-1 py-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      </CardContent>
      <CardFooter className="px-1 pt-0 pb-4">
        <Skeleton className="h-9 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;

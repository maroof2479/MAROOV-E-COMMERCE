
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  return (
    <div className="group product-card">
      <Link to={`/shop/product/${product.id}`}>
        <div className="overflow-hidden mb-3">
          <AspectRatio ratio={3/4} className="bg-secondary">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </AspectRatio>
        </div>
        <div className="px-1">
          <h3 className="font-medium text-sm mb-1">{product.name}</h3>
          <div className="flex justify-between items-center">
            <p className="font-serif">${product.price.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">{product.brand}</p>
          </div>
        </div>
      </Link>
      <div className="mt-4 px-1">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

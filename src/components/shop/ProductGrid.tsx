
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  category?: string;
  searchQuery?: string;
}

export default function ProductGrid({ products, category, searchQuery }: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  useEffect(() => {
    let result = products;
    
    if (category && category !== 'all') {
      result = result.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [products, category, searchQuery]);
  
  return (
    <div className="animate-fade-in">
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center">
          <h3 className="text-lg mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

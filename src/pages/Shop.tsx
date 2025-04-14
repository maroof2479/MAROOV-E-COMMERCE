
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products, categories } from '@/data/products';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/shop/ProductGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Shop = () => {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(category || 'all');

  let filteredProducts = products;

  if (category === 'new') {
    filteredProducts = products.filter(product => product.isNewArrival);
  } else if (category === 'bestsellers') {
    filteredProducts = products.filter(product => product.isBestseller);
  }

  const handleCategoryChange = (value: string) => {
    setActiveFilter(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-medium mb-6">
              {category === 'new' ? 'New Arrivals' : 
               category === 'bestsellers' ? 'Bestsellers' : 'Shop All Products'}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <Tabs defaultValue={activeFilter} onValueChange={handleCategoryChange} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  {categories.map(cat => (
                    <TabsTrigger key={cat.id} value={cat.slug}>
                      {cat.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-8"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  {searchQuery ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={clearSearch}
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Search className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
          </div>
          
          <ProductGrid 
            products={filteredProducts} 
            category={activeFilter !== 'all' ? activeFilter : undefined}
            searchQuery={searchQuery}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;

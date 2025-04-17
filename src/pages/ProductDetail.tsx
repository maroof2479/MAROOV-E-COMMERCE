
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/shop/ProductCard';
import NotFound from './NotFound';
import ProductDetailSkeleton from '@/components/shop/ProductDetailSkeleton';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const product = products.find(p => p.id === id);
  
  useEffect(() => {
    // Reset state when product ID changes
    setQuantity(1);
    setActiveImage(0);
    setIsLoading(true);
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-4">
          <div className="container mx-auto">
            <div className="mb-6">
              <Link to="/shop" className="inline-flex items-center text-sm hover:underline">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Shop
              </Link>
            </div>
            <ProductDetailSkeleton />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return <NotFound />;
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <Link to="/shop" className="inline-flex items-center text-sm hover:underline">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Shop
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <AspectRatio ratio={1} className="bg-secondary/50 rounded-lg overflow-hidden">
                  <img 
                    src={product.images[activeImage]} 
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative rounded-md overflow-hidden ${
                        index === activeImage ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <AspectRatio ratio={1}>
                        <img 
                          src={image} 
                          alt={`${product.name} - view ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
                <p className="text-xl font-serif mb-4">${product.price.toFixed(2)}</p>
              </div>
              
              <p className="text-muted-foreground mb-6">{product.description}</p>
              
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="flex items-center border border-input rounded-md mr-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={decrementQuantity} 
                      disabled={quantity <= 1}
                      className="h-10 w-10 rounded-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={incrementQuantity}
                      className="h-10 w-10 rounded-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button onClick={handleAddToCart} className="flex-1">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="returns">Returns</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="mt-4 text-muted-foreground">
                  <p>Free standard shipping on orders over $75.</p>
                  <p className="mt-2">Standard shipping (3-7 business days): $5.99</p>
                  <p className="mt-2">Express shipping (2-3 business days): $12.99</p>
                </TabsContent>
                <TabsContent value="returns" className="mt-4 text-muted-foreground">
                  <p>We accept returns within 30 days of delivery.</p>
                  <p className="mt-2">Items must be unused and in original packaging.</p>
                  <p className="mt-2">Contact customer service to initiate a return.</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <Separator className="mb-8" />
              <h2 className="text-2xl font-medium mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;

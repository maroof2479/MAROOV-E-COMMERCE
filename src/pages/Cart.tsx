
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Trash, Plus, Minus, ArrowRight, ShoppingBag, 
  CreditCard, Landmark, Smartphone, Truck 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const paymentSchema = z.object({
  paymentMethod: z.enum(['card', 'bank', 'upi', 'cod']),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
  upiId: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifsc: z.string().optional(),
});

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: cart, 1: payment, 2: success
  
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'card',
    },
  });
  
  const paymentMethod = form.watch('paymentMethod');
  
  const handleCheckout = () => {
    if (checkoutStep === 0) {
      setCheckoutStep(1);
      return;
    }
    
    form.handleSubmit((values) => {
      setIsCheckingOut(true);
      console.log("Processing payment with: ", values);
      
      // Simulate payment processing
      setTimeout(() => {
        clearCart();
        setIsCheckingOut(false);
        setCheckoutStep(2);
        
        toast({
          title: "Order placed successfully",
          description: "Thank you for your purchase!",
        });
      }, 2000);
    })();
  };
  
  const handleBackToCart = () => {
    setCheckoutStep(0);
  };
  
  const handleShopAgain = () => {
    setCheckoutStep(0);
  };
  
  // If checkout is complete, show success message
  if (checkoutStep === 2) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg 
                  className="h-10 w-10 text-primary" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-medium mb-4">Payment Successful!</h1>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Your order has been placed successfully. You will receive an email confirmation shortly.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-medium mb-6">
            {checkoutStep === 0 ? "Shopping Cart" : "Payment"}
          </h1>
          
          {cartItems.length === 0 && checkoutStep === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Cart Items or Payment Form */}
              <div className="md:col-span-8">
                {checkoutStep === 0 ? (
                  // Cart Items
                  <>
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex py-4 animate-fade-in">
                        <div className="w-24 h-24 bg-secondary flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.product.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                            </div>
                            <p className="font-serif">${item.product.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center border border-input rounded-md">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Trash className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={clearCart}>
                        Clear Cart
                      </Button>
                      
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/shop">Continue Shopping</Link>
                      </Button>
                    </div>
                  </>
                ) : (
                  // Payment Form
                  <div className="bg-card rounded-lg p-6 border">
                    <h2 className="text-xl font-medium mb-6">Choose Payment Method</h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormControl>
                                <RadioGroup 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  className="grid grid-cols-2 gap-4"
                                >
                                  <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-accent">
                                    <RadioGroupItem value="card" id="card" />
                                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                                      <CreditCard className="mr-2 h-5 w-5" />
                                      Credit/Debit Card
                                    </Label>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-accent">
                                    <RadioGroupItem value="bank" id="bank" />
                                    <Label htmlFor="bank" className="flex items-center cursor-pointer">
                                      <Landmark className="mr-2 h-5 w-5" />
                                      Bank Transfer
                                    </Label>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-accent">
                                    <RadioGroupItem value="upi" id="upi" />
                                    <Label htmlFor="upi" className="flex items-center cursor-pointer">
                                      <Smartphone className="mr-2 h-5 w-5" />
                                      UPI
                                    </Label>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-accent">
                                    <RadioGroupItem value="cod" id="cod" />
                                    <Label htmlFor="cod" className="flex items-center cursor-pointer">
                                      <Truck className="mr-2 h-5 w-5" />
                                      Cash on Delivery
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {paymentMethod === 'card' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <Label htmlFor="cardName">Cardholder Name</Label>
                                <Input 
                                  id="cardName" 
                                  placeholder="John Doe" 
                                  {...form.register('cardName')}
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input 
                                  id="cardNumber" 
                                  placeholder="1234 5678 9012 3456"
                                  {...form.register('cardNumber')}
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="cardExpiry">Expiry Date</Label>
                                  <Input 
                                    id="cardExpiry" 
                                    placeholder="MM/YY"
                                    {...form.register('cardExpiry')}
                                  />
                                </div>
                                
                                <div>
                                  <Label htmlFor="cardCvv">CVV</Label>
                                  <Input 
                                    id="cardCvv" 
                                    placeholder="123"
                                    type="password"
                                    maxLength={3}
                                    {...form.register('cardCvv')}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {paymentMethod === 'bank' && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="bankName">Bank Name</Label>
                              <Input 
                                id="bankName" 
                                placeholder="Your Bank Name"
                                {...form.register('bankName')}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="accountNumber">Account Number</Label>
                              <Input 
                                id="accountNumber" 
                                placeholder="Your Account Number"
                                {...form.register('accountNumber')}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="ifsc">IFSC Code</Label>
                              <Input 
                                id="ifsc" 
                                placeholder="IFSC Code"
                                {...form.register('ifsc')}
                              />
                            </div>
                          </div>
                        )}
                        
                        {paymentMethod === 'upi' && (
                          <div>
                            <Label htmlFor="upiId">UPI ID</Label>
                            <Input 
                              id="upiId" 
                              placeholder="yourname@upi"
                              {...form.register('upiId')}
                            />
                          </div>
                        )}
                        
                        {paymentMethod === 'cod' && (
                          <div className="bg-muted p-4 rounded-md">
                            <p className="text-sm">
                              You will pay when your order is delivered. Please keep the exact amount ready.
                            </p>
                          </div>
                        )}
                        
                        <div className="flex justify-between pt-4">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={handleBackToCart}
                          >
                            Back to Cart
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}
              </div>
              
              {/* Order Summary */}
              <div className="md:col-span-4">
                <div className="bg-secondary p-6 rounded-lg">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{totalPrice >= 75 ? 'Free' : '$5.99'}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-medium mb-6">
                    <span>Total</span>
                    <span>${(totalPrice + (totalPrice >= 75 ? 0 : 5.99)).toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        {checkoutStep === 0 ? (
                          <>Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" /></>
                        ) : (
                          <>Complete Payment <ArrowRight className="ml-2 h-4 w-4" /></>
                        )}
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Shipping & taxes calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

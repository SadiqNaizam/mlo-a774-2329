import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Components
import AppHeader from '@/components/layout/AppHeader';
import AppBottomNavigationBar from '@/components/layout/AppBottomNavigationBar';
import StandardFooter from '@/components/layout/StandardFooter';
import CartItemCard, { CartItemCardProps } from '@/components/CartItemCard';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

// Lucide Icons
import { ShoppingCart, Trash2, TicketPercent } from 'lucide-react';

interface CartItem extends Omit<CartItemCardProps, 'onQuantityChange' | 'onRemoveItem' | 'currencySymbol'> {
  // No additional fields needed
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 1.99,
    quantity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60',
    attributes: { 'Unit': 'Bunch (approx. 6)'},
    stockLimit: 10,
  },
  {
    id: '2',
    name: 'Fresh Milk - Whole',
    price: 3.49,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1600701026493-45028627204a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWlsa3xlbnwwfHwwfHx8MA&auto=format&fit=crop&w=300&q=60',
    attributes: { 'Size': '1 Gallon' },
    stockLimit: 5,
  },
];

const cartItemMotionVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.2, ease: 'easeIn' } },
};

const summaryCardAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.2 } }
};


const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const deliveryFee = 5.00;
  const { toast } = useToast();

  useEffect(() => {
    console.log('CartPage loaded');
  }, []);

  const handleQuantityChange = (itemId: string | number, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string | number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    setDiscountAmount(0);
    setPromoCode('');
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const grandTotal = useMemo(() => {
    return subtotal + deliveryFee - discountAmount;
  }, [subtotal, deliveryFee, discountAmount]);

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      const potentialDiscount = subtotal * 0.10;
      setDiscountAmount(potentialDiscount);
      toast({
        title: "Promo Code Applied!",
        description: `You saved $${potentialDiscount.toFixed(2)}.`,
      });
    } else if (promoCode.trim() !== '') {
      setDiscountAmount(0);
      toast({
        title: "Invalid Promo Code",
        description: "The promo code you entered is not valid.",
        variant: "destructive",
      });
    } else {
        setDiscountAmount(0);
        toast({
            title: "Enter a Promo Code",
            description: "Please enter a promo code to apply.",
            variant: "default",
        });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
      <AppHeader />

      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 pt-20 md:pt-24 pb-24 md:pb-16">
        <motion.h1 
          className="text-2xl sm:text-3xl font-bold mb-6 text-center md:text-left text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Your Shopping Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div 
            className="text-center py-12 bg-white dark:bg-slate-800 shadow-md rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ShoppingCart className="mx-auto h-16 w-16 text-primary mb-4" />
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">Your cart is empty.</p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Looks like you haven't added anything yet.
            </p>
            <Button asChild size="lg">
              <Link to="/product-listing">Start Shopping</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <section className="lg:col-span-8 space-y-4">
              <AnimatePresence initial={false}> {/* `initial={false}` prevents initial animation for already present items if not desired for first load */}
                {cartItems.map(item => (
                  <motion.div
                    key={item.id}
                    layout // Animates layout changes (e.g., when item removed)
                    variants={cartItemMotionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <CartItemCard
                      {...item}
                      onQuantityChange={handleQuantityChange}
                      onRemoveItem={handleRemoveItem}
                      currencySymbol="$"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              {cartItems.length > 0 && (
                <motion.div 
                  className="mt-6 text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: cartItems.length * 0.05 + 0.2 } }} // Delay based on number of items
                >
                  <Button
                    variant="outline"
                    onClick={handleClearCart}
                    className="text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                  </Button>
                </motion.div>
              )}
            </section>

            <motion.aside 
              className="lg:col-span-4"
              initial="initial"
              animate="animate"
              variants={summaryCardAnimation}
            >
              <Card className="shadow-lg sticky top-24 dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>

                  <Separator className="my-2 dark:bg-slate-700" />
                  
                  <div className="space-y-2">
                    <label htmlFor="promo-code" className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center">
                      <TicketPercent className="w-4 h-4 mr-1.5 text-primary" />
                      Promo Code
                    </label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="promo-code"
                        type="text"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-grow dark:bg-slate-700 dark:border-slate-600 dark:text-gray-200"
                        aria-label="Promo code"
                      />
                      <Button onClick={applyPromoCode} variant="outline" className="whitespace-nowrap dark:text-gray-200 dark:border-slate-600 dark:hover:bg-slate-700">
                        Apply
                      </Button>
                    </div>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}\
                  
                  <Separator className="my-2 dark:bg-slate-700" />
                  
                  <div className="flex justify-between text-base font-bold text-gray-800 dark:text-gray-100">
                    <span>Grand Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.aside>
          </div>
        )}\
      </main>

      <StandardFooter />
      <AppBottomNavigationBar />
    </div>
  );
};

export default CartPage;
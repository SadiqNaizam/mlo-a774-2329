import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Minus, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export interface CartItemCardProps {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  attributes?: { [key: string]: string };
  onQuantityChange: (itemId: string | number, newQuantity: number) => void;
  onRemoveItem: (itemId: string | number) => void;
  currencySymbol?: string;
  stockLimit?: number;
}

const cartItemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  transition: { duration: 0.3, ease: "easeOut" }
};

const CartItemCard: React.FC<CartItemCardProps> = ({
  id,
  name,
  price,
  quantity,
  imageUrl,
  attributes,
  onQuantityChange,
  onRemoveItem,
  currencySymbol = '$',
  stockLimit = 10,
}) => {
  console.log(`CartItemCard loaded for item ID: ${id}, Name: ${name}`);

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < stockLimit) {
        onQuantityChange(id, quantity + 1);
    }
  };

  const handleRemove = () => {
    onRemoveItem(id);
  };

  // This component will be animated by its parent list (CartPage) using AnimatePresence and motion.div wrapper per item.
  // However, if we want it to be self-animating on initial load without list context, we can use:
  // initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }} variants={cartItemVariants} transition={cartItemVariants.transition}
  // For this exercise, let's assume parent list in CartPage will handle animation.
  // If this component is used elsewhere without list animation, below could be added:
  // <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}> ... </motion.div>
  // For now, no direct motion.div wrapper here if CartPage handles stagger/AnimatePresence

  return (
    // The Card itself can be a motion component if CartPage does not wrap it for AnimatePresence.
    // For now, assuming CartPage will wrap this in a motion.li or motion.div for list animations.
    // If CartPage isn't modified for this, then we'd wrap this Card:
    // <motion.div variants={...} initial animate exit> <Card...> ... </Card> </motion.div>
     <Card className="flex flex-col sm:flex-row items-stretch overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="w-full sm:w-24 md:w-32 flex-shrink-0">
        <AspectRatio ratio={1} className="bg-muted">
          <img
            src={imageUrl || 'https://via.placeholder.com/150'}
            alt={name}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </div>

      <CardContent className="p-4 flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
        <div className="flex-grow mb-4 sm:mb-0 sm:mr-4">
          <h3 className="text-lg font-semibold line-clamp-2">{name}</h3>
          {attributes && Object.entries(attributes).map(([key, value]) => (
            <p key={key} className="text-sm text-muted-foreground">{`${key}: ${value}`}</p>
          ))}\
          <p className="text-base font-bold text-primary mt-1">
            {currencySymbol}{(price * quantity).toFixed(2)}
          </p>
          {quantity > 1 && (
            <p className="text-xs text-muted-foreground">
              ({currencySymbol}{price.toFixed(2)} each)
            </p>
          )}\
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="h-9 w-9 rounded-r-none border-r"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-3 text-sm font-medium w-10 text-center" aria-live="polite">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleIncrement}
              disabled={quantity >= stockLimit}
              aria-label="Increase quantity"
              className="h-9 w-9 rounded-l-none border-l"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRemove}
            aria-label="Remove item"
            className="h-9 w-9 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
// Note: For CartItemCard, it's often better to animate it within the list context (e.g., CartPage)
// using AnimatePresence for additions/removals. The provided CartPage.tsx already maps items.
// I will modify CartPage.tsx to wrap CartItemCard instances with motion.div for this.
// So, CartItemCard.tsx itself won't get a motion wrapper internally to avoid double animations.

export default CartItemCard;
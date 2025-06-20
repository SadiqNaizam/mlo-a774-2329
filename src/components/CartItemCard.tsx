import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Placeholder, might use just text for quantity
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Minus, Plus, Trash2 } from 'lucide-react';

export interface CartItemCardProps {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  // Optional: attributes like size, color, if applicable for the product
  attributes?: { [key: string]: string };
  onQuantityChange: (itemId: string | number, newQuantity: number) => void;
  onRemoveItem: (itemId: string | number) => void;
  // Optional: currency symbol
  currencySymbol?: string;
  stockLimit?: number; // Max quantity user can add
}

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
  stockLimit = 10, // Default stock limit
}) => {
  console.log(`CartItemCard loaded for item ID: ${id}, Name: ${name}`);

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
    // Optionally, if quantity is 1 and decrement is pressed, remove item.
    // else if (quantity === 1) {
    //   onRemoveItem(id);
    // }
  };

  const handleIncrement = () => {
    if (quantity < stockLimit) { // Respect stock limit
        onQuantityChange(id, quantity + 1);
    }
  };

  const handleRemove = () => {
    onRemoveItem(id);
  };

  return (
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
          ))}
          <p className="text-base font-bold text-primary mt-1">
            {currencySymbol}{(price * quantity).toFixed(2)}
          </p>
          {quantity > 1 && (
            <p className="text-xs text-muted-foreground">
              ({currencySymbol}{price.toFixed(2)} each)
            </p>
          )}
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

export default CartItemCard;
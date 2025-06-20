import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart } from 'lucide-react';

export interface ProductCardProps {
  id: string | number;
  slug: string; // Used for identifying the product, even if route is static for now
  name: string;
  price: number;
  unit: string; // e.g., "500g", "1 pc", "1L"
  imageUrl: string;
  // onAddToCart?: (productId: string | number) => void; // Could be added for parent-managed state
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  slug,
  name,
  price,
  unit,
  imageUrl,
}) => {
  console.log(`ProductCard loaded for: ${name} (ID: ${id}, Slug: ${slug})`);
  const { toast } = useToast();

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent link navigation if button is somehow inside a link
    event.stopPropagation(); // Stop event bubbling to the Link wrapper

    // In a real app, this would dispatch an action to add to cart
    console.log(`Product ${id} (${name}) added to cart.`);
    toast({
      title: "Added to cart!",
      description: `${name} (${unit}) has been added to your cart.`,
    });
  };

  return (
    <Card className="w-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col group">
      <Link to="/product-detail" state={{ productId: id, productSlug: slug }} className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-t-lg">
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={1 / 1}>
            <img
              src={imageUrl || 'https://via.placeholder.com/300?text=No+Image'}
              alt={name}
              className="object-cover w-full h-full rounded-t-lg transition-transform duration-300 group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300?text=No+Image')}
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-3 space-y-1 flex-grow">
          <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors h-10">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground">{unit}</p>
          <p className="text-base font-bold text-gray-800 pt-1">
            ${price.toFixed(2)}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-3 pt-0 mt-auto">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleAddToCart}
          aria-label={`Add ${name} to cart`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ProductCardProps {
  id: string | number;
  slug: string;
  name: string;
  price: number;
  unit: string;
  imageUrl: string;
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 }, // Trigger when 15% of card is visible
  transition: { duration: 0.4, ease: "easeOut" }
};

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
    event.preventDefault();
    event.stopPropagation();

    console.log(`Product ${id} (${name}) added to cart.`);
    toast({
      title: "Added to cart!",
      description: `${name} (${unit}) has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial="initial"
      whileInView="whileInView"
      viewport={cardVariants.viewport}
      variants={{ initial: cardVariants.initial, whileInView: cardVariants.whileInView }}
      transition={cardVariants.transition}
      className="h-full flex flex-col" // Ensure motion.div takes full height and allows Card to flex-grow
    >
      <Card className="w-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col group flex-grow">
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
    </motion.div>
  );
};

export default ProductCard;
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import AppBottomNavigationBar from '@/components/layout/AppBottomNavigationBar';
import StandardFooter from '@/components/layout/StandardFooter';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/components/ui/use-toast";

// Lucide Icons
import { ShoppingCart, Minus, Plus, Star, Info, Leaf, PackageOpen } from 'lucide-react';

// Placeholder product data structure
interface Product {
  id: string;
  slug: string;
  name: string;
  images: string[];
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  unit: string; // e.g., "500g", "1 pc", "1L"
  category: string;
  brand?: string;
  rating?: number;
  reviewsCount?: number;
  tags?: string[];
  availability?: 'In Stock' | 'Out of Stock';
  nutritionalFacts?: { [key: string]: string };
  ingredients?: string[];
  storageInstructions?: string;
  countryOfOrigin?: string;
}

// Sample product data (in a real app, this would be fetched based on productId)
const sampleProducts: { [key: string]: Product } = {
  'fresh-apples-1kg': {
    id: 'prod001',
    slug: 'fresh-apples-1kg',
    name: 'Fresh Organic Gala Apples',
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop', // Placeholder
      'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=800&auto=format&fit=crop', // Placeholder
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop', // Placeholder
    ],
    description: 'Crisp and sweet Gala apples, perfect for snacking or baking. Organically grown.',
    longDescription: 'Our Fresh Organic Gala Apples are hand-picked at peak ripeness to ensure the best flavor and texture. These apples are known for their mildly sweet taste, crisp bite, and beautiful red-yellow skin. They are versatile for all your culinary needs, from a healthy snack to a key ingredient in pies and sauces. Certified organic, grown without synthetic pesticides or fertilizers.',
    price: 4.99,
    originalPrice: 5.49,
    unit: '1kg pack',
    category: 'Fruits',
    brand: 'Green Orchard Organics',
    rating: 4.7,
    reviewsCount: 125,
    tags: ['Organic', 'Fresh', 'Best Seller'],
    availability: 'In Stock',
    nutritionalFacts: {
      'Serving Size': '1 medium apple (182g)',
      'Calories': '95',
      'Total Fat': '0.3g',
      'Sodium': '2mg',
      'Total Carbohydrate': '25g',
      'Dietary Fiber': '4.4g',
      'Total Sugars': '19g',
      'Protein': '0.5g',
      'Vitamin C': '14% DV',
      'Potassium': '6% DV',
    },
    ingredients: ['100% Organic Gala Apples'],
    storageInstructions: 'Store in a cool, dry place or refrigerate for extended freshness.',
    countryOfOrigin: 'USA',
  },
  'default-product': { // Fallback product
    id: 'prod000',
    slug: 'default-product',
    name: 'Amazing Product Title',
    images: [
      'https://via.placeholder.com/600x600.png?text=Product+Image+1',
      'https://via.placeholder.com/600x600.png?text=Product+Image+2',
      'https://via.placeholder.com/600x600.png?text=Product+Image+3',
    ],
    description: 'This is a brief, compelling description of the product, highlighting its key benefits and features.',
    longDescription: 'This is a more detailed explanation of the product. It can cover various aspects like its usage, benefits, how it\'s made, and any special characteristics. It helps customers make an informed decision.',
    price: 19.99,
    unit: 'per item',
    category: 'General',
    availability: 'In Stock',
    tags: ['New Arrival', 'Popular'],
    nutritionalFacts: {
      'Feature 1': 'Value 1',
      'Feature 2': 'Value 2',
    },
    ingredients: ['Component A', 'Component B', 'Component C'],
    storageInstructions: 'Keep in a cool, dry place.',
  }
};


const ProductDetailPage: React.FC = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    console.log('ProductDetailPage loaded');
    const state = location.state as { productId?: string; productSlug?: string };
    // In a real app, fetch product details using productId or productSlug
    // For now, we use the passed slug or a default
    const selectedProduct = sampleProducts[state?.productSlug || ''] || sampleProducts['default-product'];
    setProduct(selectedProduct);

    // Reset quantity when product changes
    setQuantity(1);
  }, [location.state]);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading product details...</p>
        </div>
        <AppBottomNavigationBar />
        <StandardFooter />
      </div>
    );
  }

  const handleAddToCart = () => {
    // Logic to add product to cart
    console.log(`Added ${quantity} of ${product.name} (ID: ${product.id}) to cart.`);
    toast({
      title: "Item Added to Cart!",
      description: `${quantity} x ${product.name} (${product.unit}) added.`,
      action: (
        <Link to="/cart">
          <Button variant="outline" size="sm">View Cart</Button>
        </Link>
      ),
    });
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prevQuantity => Math.max(1, Math.min(prevQuantity + change, 10))); // Max 10 items for demo
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />
      <ScrollArea className="flex-1 pb-16 md:pb-0"> {/* Padding bottom for bottom nav */}
        <main className="container mx-auto py-6 lg:py-10 px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Product Image Carousel */}
            <Card className="shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {product.images.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square bg-muted flex items-center justify-center">
                          <img src={img} alt={`${product.name} - Image ${index + 1}`} className="object-contain w-full h-full" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {product.images.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                    </>
                  )}
                </Carousel>
              </CardContent>
            </Card>

            {/* Product Information */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl lg:text-3xl font-bold">{product.name}</CardTitle>
                  {product.brand && <p className="text-sm text-muted-foreground">Brand: {product.brand}</p>}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
                    {product.originalPrice && (
                      <p className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
                    )}
                    <p className="text-sm text-muted-foreground">/ {product.unit}</p>
                  </div>

                  {product.rating && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({product.reviewsCount} reviews)</span>
                    </div>
                  )}

                  <p className="text-gray-700">{product.description}</p>

                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map(tag => (
                        <Badge key={tag} variant={tag === 'Organic' ? 'default' : 'secondary'} className={tag === 'Organic' ? 'bg-green-600 hover:bg-green-700 text-white' : ''}>
                          {tag === 'Organic' && <Leaf className="mr-1 h-3 w-3" />}
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Separator />

                  {/* Quantity Selector and Add to Cart */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Quantity:</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center text-lg font-medium">{quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)} disabled={quantity >= 10}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={product.availability === 'Out of Stock'}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {product.availability === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                   {product.availability === 'Out of Stock' && <p className="text-sm text-red-600 text-center">This product is currently unavailable.</p>}
                </CardContent>
              </Card>

              {/* Accordion for more details */}
              <Accordion type="single" collapsible className="w-full shadow-lg rounded-lg bg-white">
                <AccordionItem value="description">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <div className="flex items-center">
                      <Info className="mr-2 h-5 w-5 text-primary" />
                      Detailed Description
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0 text-gray-600">
                    {product.longDescription || 'No detailed description available.'}
                  </AccordionContent>
                </AccordionItem>

                {product.nutritionalFacts && (
                  <AccordionItem value="nutritional-facts">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <div className="flex items-center">
                        <Leaf className="mr-2 h-5 w-5 text-green-600" />
                        Nutritional Facts
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-0 text-gray-600">
                      <ul className="list-disc pl-5 space-y-1">
                        {Object.entries(product.nutritionalFacts).map(([key, value]) => (
                          <li key={key}><strong>{key}:</strong> {value}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {product.ingredients && product.ingredients.length > 0 && (
                  <AccordionItem value="ingredients">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <div className="flex items-center">
                        <PackageOpen className="mr-2 h-5 w-5 text-orange-500" />
                        Ingredients
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-0 text-gray-600">
                      <p>{product.ingredients.join(', ')}</p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {product.storageInstructions && (
                  <AccordionItem value="storage">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <div className="flex items-center">
                        <Info className="mr-2 h-5 w-5 text-blue-500" />
                        Storage Instructions
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-0 text-gray-600">
                      {product.storageInstructions}
                    </AccordionContent>
                  </AccordionItem>
                )}
                {product.countryOfOrigin && (
                  <AccordionItem value="origin">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                       <div className="flex items-center">
                        <Info className="mr-2 h-5 w-5 text-purple-500" />
                        Country of Origin
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-0 text-gray-600">
                      {product.countryOfOrigin}
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>
        </main>
      </ScrollArea>
      <AppBottomNavigationBar />
      <div className="hidden md:block"> {/* Show footer only on md and up screens */}
        <StandardFooter />
      </div>
    </div>
  );
};

export default ProductDetailPage;
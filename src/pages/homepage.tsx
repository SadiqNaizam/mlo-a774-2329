import React from 'react';
import { Link } from 'react-router-dom';

import AppHeader from '@/components/layout/AppHeader';
import AppBottomNavigationBar from '@/components/layout/AppBottomNavigationBar';
import StandardFooter from '@/components/layout/StandardFooter';
import CategoryPill from '@/components/CategoryPill';
import ProductCard, { ProductCardProps } from '@/components/ProductCard';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Input } from '@/components/ui/input'; // For the explicit search bar if needed, though AppHeader handles it

import { ShoppingBag, Apple, Carrot, Milk, Search, Cookie } from 'lucide-react'; // Added Cookie icon

// Sample Data with updated image URLs
const promotions = [
  { id: 1, imageUrl: 'https://source.unsplash.com/1200x400/?fruits,sale,discount,offer,grocery', altText: 'Fruits Discount' },
  { id: 2, imageUrl: 'https://source.unsplash.com/1200x400/?vegetables,market,fresh,organic,promotion', altText: 'Fresh Vegetables' },
  { id: 3, imageUrl: 'https://source.unsplash.com/1200x400/?snacks,chips,cookies,promotion,fiesta', altText: 'Snacks Fiesta' },
];

const categories = [
  { name: 'Groceries', slug: 'groceries', Icon: ShoppingBag, imageUrl: 'https://source.unsplash.com/100x100/?groceries,food,basket' },
  { name: 'Fruits', slug: 'fruits', Icon: Apple, imageUrl: 'https://source.unsplash.com/100x100/?fruits,apple,orange' },
  { name: 'Vegetables', slug: 'vegetables', Icon: Carrot, imageUrl: 'https://source.unsplash.com/100x100/?vegetables,carrot,broccoli' },
  { name: 'Dairy', slug: 'dairy', Icon: Milk, imageUrl: 'https://source.unsplash.com/100x100/?dairy,milk,cheese' },
  { name: 'Snacks', slug: 'snacks', Icon: Cookie, imageUrl: 'https://source.unsplash.com/100x100/?snacks,chips,cookies' },
];

const featuredProducts: ProductCardProps[] = [
  { id: 'fp1', slug: 'fresh-apples-1kg', name: 'Fresh Red Apples', price: 2.99, unit: '1kg', imageUrl: 'https://source.unsplash.com/300x300/?shiny,red,apples,orchard,closeup' },
  { id: 'fp2', slug: 'organic-carrots-500g', name: 'Organic Carrots', price: 1.49, unit: '500g', imageUrl: 'https://source.unsplash.com/300x300/?vibrant,organic,carrots,bunch,fresh' },
  { id: 'fp3', slug: 'whole-milk-1l', name: 'Fresh Whole Milk', price: 1.99, unit: '1L', imageUrl: 'https://source.unsplash.com/300x300/?fresh,whole,milk,carton,dairy,farm' },
  { id: 'fp4', slug: 'potato-chips-large', name: 'Classic Potato Chips', price: 3.20, unit: 'Large Bag', imageUrl: 'https://source.unsplash.com/300x300/?crispy,potato,chips,snack,bowl' },
  { id: 'fp5', slug: 'artisan-bread-loaf', name: 'Artisan Sourdough Bread', price: 4.50, unit: '1 Loaf', imageUrl: 'https://source.unsplash.com/300x300/?artisan,sourdough,bread,loaf,bakery,crusty' },
  { id: 'fp6', slug: 'free-range-eggs-dozen', name: 'Free-Range Eggs', price: 3.99, unit: '1 Dozen', imageUrl: 'https://source.unsplash.com/300x300/?brown,free-range,eggs,carton,farm' },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />

      <main className="flex-grow pb-16 md:pb-0"> {/* Padding bottom for AppBottomNavigationBar on mobile */}
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-6 space-y-8">
            
            {/* Search Bar - Mobile specific, as AppHeader has one for larger screens */}
            <div className="md:hidden relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 w-full shadow-sm"
                onFocus={() => {
                  // Potentially navigate to a dedicated search page or product listing
                  // For now, AppHeader's search icon links to /product-listing
                  // This input could also trigger navigation or filter on the current page
                  // For simplicity, keeping AppHeader's search behavior primary.
                }}
              />
            </div>
            
            {/* Promotions Carousel */}
            <section aria-labelledby="promotions-heading">
              <h2 id="promotions-heading" className="sr-only">Promotions</h2>
              <Carousel
                opts={{ loop: true }}
                className="w-full shadow-lg rounded-lg overflow-hidden"
              >
                <CarouselContent>
                  {promotions.map((promo) => (
                    <CarouselItem key={promo.id}>
                      <div className="aspect-[3/1] bg-muted">
                        <img src={promo.imageUrl} alt={promo.altText} className="w-full h-full object-cover" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-12" />
                <CarouselNext className="mr-12" />
              </Carousel>
            </section>

            {/* Product Categories */}
            <section aria-labelledby="categories-heading">
              <h2 id="categories-heading" className="text-xl font-semibold mb-3 text-gray-800">
                Shop by Category
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => (
                  <CategoryPill
                    key={category.slug}
                    categoryName={category.name}
                    categorySlug={category.slug}
                    IconComponent={category.imageUrl ? undefined : category.Icon}
                    imageUrl={category.imageUrl}
                  />
                ))}
              </div>
            </section>

            {/* Featured Products */}
            <section aria-labelledby="featured-products-heading">
              <div className="flex justify-between items-center mb-3">
                <h2 id="featured-products-heading" className="text-xl font-semibold text-gray-800">
                  Featured Products
                </h2>
                <Link to="/product-listing" className="text-sm text-primary hover:underline font-medium">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </section>
            
          </div>
        </ScrollArea>
      </main>

      <AppBottomNavigationBar />
      <StandardFooter />
    </div>
  );
};

export default HomePage;
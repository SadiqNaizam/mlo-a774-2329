import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import AppHeader from '@/components/layout/AppHeader';
import AppBottomNavigationBar from '@/components/layout/AppBottomNavigationBar';
import StandardFooter from '@/components/layout/StandardFooter';
import CategoryPill from '@/components/CategoryPill';
import ProductCard, { ProductCardProps } from '@/components/ProductCard';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Input } from '@/components/ui/input';

import { ShoppingBag, Apple, Carrot, Milk, Search, Cookie } from 'lucide-react';

const promotions = [
  { id: 1, imageUrl: 'https://source.unsplash.com/1200x400/?grocery,store,aisle,discount,banner', altText: 'Grocery Store Discount Banner' },
  { id: 2, imageUrl: 'https://source.unsplash.com/1200x400/?healthy,food,delivery,box,promotion', altText: 'Healthy Food Delivery Promotion' },
  { id: 3, imageUrl: 'https://source.unsplash.com/1200x400/?online,grocery,shopping,app,deal', altText: 'Online Grocery Shopping Deal' },
];

const categories = [
  { name: 'Groceries', slug: 'groceries', Icon: ShoppingBag, imageUrl: 'https://source.unsplash.com/100x100/?shopping,cart,full,groceries' },
  { name: 'Fruits', slug: 'fruits', Icon: Apple, imageUrl: 'https://source.unsplash.com/100x100/?assorted,colorful,fruits,market,stall' },
  { name: 'Vegetables', slug: 'vegetables', Icon: Carrot, imageUrl: 'https://source.unsplash.com/100x100/?fresh,green,vegetables,farmers,market' },
  { name: 'Dairy', slug: 'dairy', Icon: Milk, imageUrl: 'https://source.unsplash.com/100x100/?milk,cheese,yogurt,dairy,products' },
  { name: 'Snacks', slug: 'snacks', Icon: Cookie, imageUrl: 'https://source.unsplash.com/100x100/?chips,pretzels,cookies,snack,aisle' },
];

const featuredProducts: ProductCardProps[] = [
  { id: 'fp1', slug: 'fresh-apples-1kg', name: 'Fresh Red Apples', price: 2.99, unit: '1kg', imageUrl: 'https://source.unsplash.com/300x300/?crisp,red,gala,apples,basket' },
  { id: 'fp2', slug: 'organic-carrots-500g', name: 'Organic Carrots', price: 1.49, unit: '500g', imageUrl: 'https://source.unsplash.com/300x300/?bright,orange,organic,carrots,bunch' },
  { id: 'fp3', slug: 'whole-milk-1l', name: 'Fresh Whole Milk', price: 1.99, unit: '1L', imageUrl: 'https://source.unsplash.com/300x300/?cold,glass,milk,carton,breakfast' },
  { id: 'fp4', slug: 'potato-chips-large', name: 'Classic Potato Chips', price: 3.20, unit: 'Large Bag', imageUrl: 'https://source.unsplash.com/300x300/?potato,chips,bowl,party,snack' },
  { id: 'fp5', slug: 'artisan-bread-loaf', name: 'Artisan Sourdough Bread', price: 4.50, unit: '1 Loaf', imageUrl: 'https://source.unsplash.com/300x300/?freshly,baked,sourdough,bread,bakery' },
  { id: 'fp6', slug: 'free-range-eggs-dozen', name: 'Free-Range Eggs', price: 3.99, unit: '1 Dozen', imageUrl: 'https://source.unsplash.com/300x300/?carton,brown,eggs,farm,kitchen' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};


const HomePage: React.FC = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />

      <main className="flex-grow pb-16 md:pb-0">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-6 space-y-8">
            
            <motion.div
              className="md:hidden relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 w-full shadow-sm"
              />
            </motion.div>
            
            <motion.section
              aria-labelledby="promotions-heading"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
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
            </motion.section>

            <motion.section
              aria-labelledby="categories-heading"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <h2 id="categories-heading" className="text-xl font-semibold mb-3 text-gray-800">
                Shop by Category
              </h2>
              <motion.div
                className="flex flex-wrap gap-2 sm:gap-3"
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible" // Use whileInView for the container if section is already animated by whileInView
                viewport={{ once: true, amount: 0.1 }}
              >
                {categories.map((category) => (
                  <motion.div key={category.slug} variants={listItemVariants}>
                    <CategoryPill
                      categoryName={category.name}
                      categorySlug={category.slug}
                      IconComponent={category.imageUrl ? undefined : category.Icon}
                      imageUrl={category.imageUrl}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            <motion.section
              aria-labelledby="featured-products-heading"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 id="featured-products-heading" className="text-xl font-semibold text-gray-800">
                  Featured Products
                </h2>
                <Link to="/product-listing" className="text-sm text-primary hover:underline font-medium">
                  View All
                </Link>
              </div>
              {/* ProductCards will self-animate due to their internal motion.div with whileInView */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </motion.section>
            
          </div>
        </ScrollArea>
      </main>

      <AppBottomNavigationBar />
      <StandardFooter />
    </div>
  );
};

export default HomePage;
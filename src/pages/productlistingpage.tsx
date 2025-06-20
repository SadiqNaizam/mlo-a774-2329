import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import AppBottomNavigationBar from '@/components/layout/AppBottomNavigationBar';
import ProductCard, { ProductCardProps } from '@/components/ProductCard';
import StandardFooter from '@/components/layout/StandardFooter';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search as SearchIcon } from 'lucide-react';

// Mock product data with updated image URLs
const allMockProducts: ProductCardProps[] = [
  { id: '1', slug: 'fresh-avocado', name: 'Fresh Avocado Hass Variety', price: 1.99, unit: '1 pc', imageUrl: 'https://source.unsplash.com/300x300/?hass,avocado' },
  { id: '2', slug: 'organic-bananas', name: 'Organic Bananas Bunch', price: 2.49, unit: 'approx 5-7 pcs', imageUrl: 'https://source.unsplash.com/300x300/?banana,bunch' },
  { id: '3', slug: 'whole-milk', name: 'Fresh Whole Milk Grade A', price: 3.29, unit: '1 Gallon', imageUrl: 'https://source.unsplash.com/300x300/?gallon,milk' },
  { id: '4', slug: 'sourdough-bread', name: 'Artisan Sourdough Bread Loaf', price: 4.99, unit: '1 loaf', imageUrl: 'https://source.unsplash.com/300x300/?sourdough,bread,loaf' },
  { id: '5', slug: 'free-range-eggs', name: 'Large Free-Range Eggs', price: 3.99, unit: '1 dozen', imageUrl: 'https://source.unsplash.com/300x300/?dozen,eggs' },
  { id: '6', slug: 'cherry-tomatoes', name: 'Sweet Cherry Tomatoes Pack', price: 2.79, unit: '1 pint', imageUrl: 'https://source.unsplash.com/300x300/?cherry,tomatoes,pack' },
  { id: '7', slug: 'greek-yogurt', name: 'Plain Greek Yogurt Natural', price: 3.49, unit: '32 oz', imageUrl: 'https://source.unsplash.com/300x300/?greek,yogurt,tub' },
  { id: '8', slug: 'almond-butter', name: 'Creamy Almond Butter Jar', price: 7.99, unit: '16 oz', imageUrl: 'https://source.unsplash.com/300x300/?almond,butter,jar' },
  { id: '9', slug: 'spinach-bunch', name: 'Organic Spinach Bunch', price: 2.29, unit: '1 bunch', imageUrl: 'https://source.unsplash.com/300x300/?spinach,bunch' },
  { id: '10', slug: 'pasta-linguine', name: 'Linguine Pasta Imported', price: 1.79, unit: '500g', imageUrl: 'https://source.unsplash.com/300x300/?linguine,pasta,package' },
];

const ProductListingPage: React.FC = () => {
  console.log('ProductListingPage loaded');

  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('relevance');
  const [initialProducts, setInitialProducts] = useState<ProductCardProps[]>(allMockProducts);
  const [displayedProducts, setDisplayedProducts] = useState<ProductCardProps[]>(allMockProducts);
  const [categoryName, setCategoryName] = useState('All Products');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    const searchQuery = queryParams.get('search'); // For search term from AppHeader, etc.

    let currentCategoryName = 'All Products';
    let productsForCategory = [...allMockProducts];

    if (category) {
      currentCategoryName = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      // Mock filtering by category based on product names
      const categoryTerms = category.split('-').map(term => term.toLowerCase());
      productsForCategory = allMockProducts.filter(p => 
        categoryTerms.some(term => p.name.toLowerCase().includes(term) || p.slug.toLowerCase().includes(term))
      );
      if (productsForCategory.length === 0 && allMockProducts.length > 0) {
         // Fallback if no specific match but category was given, show a few items
         productsForCategory = allMockProducts.slice(0, 4);
      }
    }
    
    setCategoryName(currentCategoryName);
    setInitialProducts(productsForCategory);

    if (searchQuery) {
      setSearchTerm(searchQuery);
    } else {
      // If no search query from URL, ensure searchTerm is reset if user navigates here via category link
      // (unless we want to persist search term across category navigations, which is more complex)
      // For simplicity, clear search term if no specific query is in URL for it
      // setSearchTerm(''); // Optional: reset search term on category navigation
    }
  }, [location.search]);

  useEffect(() => {
    let tempProducts = [...initialProducts];

    if (searchTerm.trim()) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    switch (sortOption) {
      case 'price-asc':
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        tempProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'relevance':
      default:
        // Maintain the order from initialProducts (which might be category-specific or default)
        break;
    }
    setDisplayedProducts(tempProducts);
  }, [searchTerm, sortOption, initialProducts]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AppHeader />

      {/* Controls Area (fixed below header) */}
      <div className="container mx-auto px-4 pt-4 shrink-0"> {/* shrink-0 to prevent this from shrinking */}
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 self-start sm:self-center truncate max-w-xs sm:max-w-sm md:max-w-md" title={categoryName}>
            {categoryName}
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search in this category..."
                className="pl-9 w-full sm:w-56 md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search products in current category"
              />
            </div>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full sm:w-auto min-w-[180px]" aria-label="Sort products by">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A-Z</SelectItem>
                <SelectItem value="name-desc">Name: Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Scrollable Product Grid and Footer Area */}
      <ScrollArea className="flex-grow container mx-auto px-4 pb-20 md:pb-6"> {/* Adjusted padding for bottom nav/footer */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center py-10">
            <SearchIcon className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-xl text-muted-foreground">No products found.</p>
            {searchTerm && <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>}
          </div>
        )}\n        <div className="mt-8 border-t pt-8"> {/* Ensure footer is visually separated and has space */}
          <StandardFooter />
        </div>
      </ScrollArea>
      
      <AppBottomNavigationBar />
    </div>
  );
};

export default ProductListingPage;
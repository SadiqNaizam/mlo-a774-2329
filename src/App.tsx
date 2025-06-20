import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Ensure this path is correct if sonner is also from ui
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext"; // Adjusted path

import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductListingPage from "./pages/ProductListingPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<ThemeProvider defaultTheme="system" storageKey="quickdash-ui-theme">
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner /> {/* Assuming this is correctly named and imported */}
      <BrowserRouter>
          <Routes>


            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product-detail" element={<ProductDetailPage />} />
            <Route path="/product-listing" element={<ProductListingPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            {/* catch-all */}
            <Route path="*" element={<NotFound />} />


          </Routes>
      </BrowserRouter>
      </TooltipProvider>
  </QueryClientProvider>
</ThemeProvider>
);

export default App;
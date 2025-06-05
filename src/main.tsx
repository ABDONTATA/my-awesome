import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./Contexts/AuthProvider.tsx";
import { ProductsProvider } from "./Contexts/ProductsProvider.tsx";
import { ThemeProvider } from "./Contexts/ThemeProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Contexts/CartContext.tsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <ProductsProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </ProductsProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

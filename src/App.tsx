
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import { useEffect } from "react";

// For animation support
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  // Set default document direction for Arabic support
  useEffect(() => {
    document.documentElement.dir = "rtl";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin-old" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

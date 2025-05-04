
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import { useEffect } from "react";

// For animation support
import { motion, AnimatePresence } from "framer-motion";

// تهيئة عميل الاستعلام
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchInterval: 30000, // إعادة تحميل البيانات كل 30 ثانية
    },
  },
});

const App = () => {
  // تعيين اتجاه المستند الافتراضي لدعم اللغة العربية
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
            <Routes>
              {/* مسار صفحة الإدارة لا يستخدم Layout لأنه لديه تخطيط خاص به */}
              <Route path="/admin" element={<AdminDashboard />} />
              
              {/* المسارات الأخرى تستخدم Layout */}
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/admin-old" element={<Navigate to="/admin" replace />} />
              {/* أضف جميع المسارات المخصصة فوق مسار النجمة "*" */}
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

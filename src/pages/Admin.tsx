
import { useEffect } from "react";
import AdminDataTable from "@/components/AdminDataTable";
import { motion } from "framer-motion";

const Admin = () => {
  // Set page title
  useEffect(() => {
    document.title = "إدارة البيانات - حزب مستقبل وطن";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header with Logo */}
      <div className="w-full bg-white py-6 shadow-md mb-8 flex justify-center">
        <div className="relative h-32 w-32">
          <img
            src="/lovable-uploads/2c11a5e1-640a-4aa2-9949-49686bc933ef.png"
            alt="شعار حزب مستقبل وطن"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-party-darkblue mb-2">لوحة الإدارة</h1>
          <h2 className="text-xl text-gray-600">أمانة الشباب – قسم منتزة أول</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AdminDataTable />
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;

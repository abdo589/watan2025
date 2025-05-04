
import { useEffect, useState } from "react";
import { getAllMembers, downloadCSV } from "@/services/membersService";
import { MemberData } from "@/models/MemberData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Download, Search, Trash, LogOut } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import AdminLogin from "@/components/AdminLogin";
import { isAuthenticated, logout } from "@/services/authService";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  // حالة التوثيق
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const navigate = useNavigate();
  
  // حالة البيانات والبحث
  const [members, setMembers] = useState<MemberData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // تحميل بيانات الأعضاء
  useEffect(() => {
    document.title = "لوحة الإدارة - حزب مستقبل وطن";
    if (isLoggedIn) {
      loadMembers();
      
      // تحديث البيانات كل 30 ثانية للتأكد من أن البيانات محدثة من جميع الأجهزة
      const intervalId = setInterval(loadMembers, 30000);
      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn]);

  const loadMembers = () => {
    try {
      setIsLoading(true);
      const data = getAllMembers();
      setMembers(data);
    } catch (error) {
      toast.error("حدث خطأ أثناء تحميل البيانات");
      console.error("Error loading members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // التعامل مع تسجيل الخروج
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    toast.success("تم تسجيل الخروج بنجاح");
  };

  // التعامل مع حذف عضو
  const handleDeleteMember = (id: string) => {
    try {
      // في تطبيق حقيقي ستقوم بالاتصال بخادم هنا
      // حالياً سنقوم بتصفية المصفوفة فقط
      const updatedMembers = members.filter(member => member.id !== id);
      setMembers(updatedMembers);
      
      // تحديث التخزين المحلي (محاكاة قاعدة البيانات)
      localStorage.setItem("watan_youth_members", JSON.stringify(updatedMembers));
      
      toast.success("تم حذف العضو بنجاح");
    } catch (error) {
      toast.error("حدث خطأ أثناء حذف العضو");
      console.error("Error deleting member:", error);
    }
  };

  // تصفية الأعضاء بناءً على مصطلح البحث
  const filteredMembers = members.filter(member => 
    member.name.includes(searchTerm) || 
    member.nationalId.includes(searchTerm) ||
    member.phone.includes(searchTerm) ||
    member.position.includes(searchTerm)
  );

  // إذا لم يكن المستخدم مسجل الدخول، عرض نموذج تسجيل الدخول
  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* رأس الصفحة مع الشعار */}
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
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")} 
              className="text-party-blue hover:bg-blue-50"
            >
              العودة إلى صفحة التسجيل
            </Button>
            
            <h1 className="text-3xl font-bold text-party-darkblue">لوحة الإدارة</h1>
            
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="text-red-500 hover:bg-red-50 hover:text-red-600 flex gap-2 items-center"
            >
              <LogOut size={16} />
              تسجيل الخروج
            </Button>
          </div>
          <h2 className="text-xl text-gray-600">أمانة الشباب – قسم منتزة أول</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-party-blue to-party-lightblue text-white">
              <h2 className="text-2xl font-bold mb-2 text-center">بيانات الأعضاء المسجلين</h2>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mt-4" dir="rtl">
                <div className="relative">
                  <Input
                    placeholder="بحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white text-black pl-10"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Search size={18} />
                  </span>
                </div>
                <Button 
                  onClick={downloadCSV}
                  className="bg-green-600 hover:bg-green-700 btn-shine flex gap-2"
                >
                  <Download size={16} />
                  تصدير البيانات (Excel)
                </Button>
              </div>
            </div>

            <div className="p-4 overflow-x-auto">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-party-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2 text-gray-500">جاري تحميل البيانات...</p>
                </div>
              ) : members.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  لا توجد بيانات مسجلة بعد
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100">
                        <TableHead className="text-right">الاسم</TableHead>
                        <TableHead className="text-right">الرقم القومي</TableHead>
                        <TableHead className="text-right">رقم التليفون</TableHead>
                        <TableHead className="text-right">النوع</TableHead>
                        <TableHead className="text-right">الصفة</TableHead>
                        <TableHead className="text-right">تاريخ التسجيل</TableHead>
                        <TableHead className="text-right">إجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.map((member) => (
                        <TableRow key={member.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>{member.nationalId}</TableCell>
                          <TableCell dir="ltr" className="text-right">{member.phone}</TableCell>
                          <TableCell>{member.gender === 'male' ? 'ذكر' : 'أنثى'}</TableCell>
                          <TableCell>{member.position}</TableCell>
                          <TableCell>
                            {member.timestamp instanceof Date
                              ? member.timestamp.toLocaleDateString('ar-EG')
                              : new Date().toLocaleDateString('ar-EG')}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => member.id && handleDeleteMember(member.id)}
                              className="h-8 px-2"
                            >
                              <Trash size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4 text-center text-sm text-gray-500" dir="rtl">
                    إجمالي الأعضاء: {filteredMembers.length}
                  </div>
                </>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;

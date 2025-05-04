
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// بيانات تسجيل الدخول (في تطبيق حقيقي يجب أن تكون في الخادم)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "watan2025";

interface LoginFormProps {
  onLogin: () => void;
}

export const AdminLogin = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // محاكاة تأخير الشبكة
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // حفظ حالة تسجيل الدخول في التخزين المحلي
        localStorage.setItem("watan_admin_auth", "true");
        toast.success("تم تسجيل الدخول بنجاح");
        onLogin();
      } else {
        toast.error("اسم المستخدم أو كلمة المرور غير صحيحة");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      {/* الشعار */}
      <div className="w-full py-6 mb-8 flex justify-center">
        <div className="relative h-32 w-32">
          <img
            src="/lovable-uploads/2c11a5e1-640a-4aa2-9949-49686bc933ef.png"
            alt="شعار حزب مستقبل وطن"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-party-darkblue">تسجيل الدخول للإدارة</h1>
            <p className="text-gray-600 mt-2">أدخل بيانات الدخول للوصول إلى لوحة الإدارة</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                اسم المستخدم
              </label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                كلمة المرور
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                required
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-party-blue hover:bg-party-darkblue btn-shine"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    جاري تسجيل الدخول...
                  </div>
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-party-blue hover:underline text-sm"
            >
              العودة إلى صفحة التسجيل
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

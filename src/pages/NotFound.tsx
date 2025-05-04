
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center" dir="rtl">
        <h1 className="text-6xl font-bold text-party-blue mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">عفواً، الصفحة غير موجودة</p>
        <Button onClick={() => navigate("/")} className="bg-party-blue hover:bg-party-darkblue btn-shine">
          العودة للصفحة الرئيسية
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

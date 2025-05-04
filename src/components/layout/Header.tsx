
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-party-darkblue to-party-blue text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 relative">
                <img 
                  src="/lovable-uploads/2c11a5e1-640a-4aa2-9949-49686bc933ef.png" 
                  alt="شعار حزب مستقبل وطن" 
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="mr-4 flex items-baseline space-x-4 rtl:space-x-reverse">
                <button 
                  onClick={() => navigate("/")}
                  className="text-white hover:bg-party-darkblue px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  التسجيل
                </button>
                <button 
                  onClick={() => navigate("/admin")}
                  className="text-gray-200 hover:bg-party-darkblue hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  عرض البيانات
                </button>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center">
              <h1 className="text-lg font-bold">أمانة الشباب – قسم منتزة أول – حزب مستقبل وطن</h1>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-party-darkblue focus:outline-none"
            >
              <span className="sr-only">فتح القائمة</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      <div className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
            className="text-white hover:bg-party-darkblue block px-3 py-2 rounded-md text-base font-medium w-full text-right"
          >
            التسجيل
          </button>
          <button
            onClick={() => {
              navigate("/admin");
              setMobileMenuOpen(false);
            }}
            className="text-gray-200 hover:bg-party-darkblue hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-right"
          >
            عرض البيانات
          </button>
        </div>
        <div className="px-4 pb-3">
          <h1 className="text-sm font-bold text-white text-center">أمانة الشباب – قسم منتزة أول – حزب مستقبل وطن</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;


import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen" dir="rtl">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>جميع الحقوق محفوظة © {new Date().getFullYear()} - حزب مستقبل وطن</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

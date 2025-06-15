import React, { ReactNode } from "react";
import Footer from "./Footer";
import DoctorNavbar from "./DoctorNavbar";

interface LayoutProps {
  children: ReactNode;
  withFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, withFooter = true }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DoctorNavbar />
      <main className="flex-grow">{children}</main>
      {withFooter && <Footer />}
    </div>
  );
};

export default Layout;

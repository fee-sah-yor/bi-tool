"use client";
import Card from "./components/Card";
import EnhancedTable from "./components/Table";
import SalesTrend from "./components/SalesTrend";
import UserGrowth from "./components/UserGrowth";
import Category from "./components/Category";
import NavBar from "./components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "./utils/localStorage";
import { AuthProvider } from "./utils/authContext";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getToken();
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push("/login");
      }
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#ED1450] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }
  return (
    <>
      <AuthProvider>
        <NavBar />
        <div className="p-8 mb-16 mt-20 h-full md:mb-0 max-sm:p-3 w-full lg:absolute">
          <div className="space-y-12">
            <Card />
            <div className="flex flex-col md:flex-row overflow-auto w-full gap-4">
              <SalesTrend />
              <UserGrowth />
              <Category />
            </div>
            <EnhancedTable />
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

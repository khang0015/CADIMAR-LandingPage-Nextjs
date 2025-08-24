"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AuthWrapper>{children}</AuthWrapper>;
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("admin-auth") === "true";
      if (!isAuth && window.location.pathname !== "/admin/login") {
        router.replace("/admin/login");
      }
    }
  }, []);
  return <>{children}</>;
}

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Upload,
  Settings,
  TestTube,
  Menu,
  X,
  User,
  LogOut
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  // {
  //   name: 'Dashboard',
  //   href: '/admin',
  //   icon: LayoutDashboard,
  //   description: 'Tổng quan hệ thống'
  // },
  // {
  //   name: 'Quản lý Blog',
  //   href: '/admin/blogs',
  //   icon: FileText,
  //   description: 'Tạo và quản lý bài viết'
  // },
  {
    name: 'Quản lý Contact',
    href: '/admin/contacts',
    icon: MessageSquare,
    description: 'Xem và trả lời tin nhắn'
  },
  {
    name: 'Quản lý File',
    href: '/admin/uploads',
    icon: Upload,
    description: 'Upload và quản lý ảnh'
  },
  // {
  //   name: 'Cài đặt',
  //   href: '/admin/settings',
  //   icon: Settings,
  //   description: 'Cấu hình hệ thống'
  // },
  // {
  //   name: 'Test',
  //   href: '/admin/test',
  //   icon: TestTube,
  //   description: 'Kiểm tra hệ thống'
  // }
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
  <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - always fixed, does not scroll with content */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ height: '100vh' }}
      >
        {/* Logo */}
  <div className="flex items-center justify-between h-20 px-6 border-b border-slate-700">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <span className="text-xl font-bold text-white">Cadimar</span>
              <p className="text-xs text-slate-300">Admin Panel</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-slate-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-white group-hover:scale-110"
                )} />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className={cn(
                    "text-xs transition-colors",
                    isActive ? "text-blue-100" : "text-slate-400 group-hover:text-slate-300"
                  )}>{item.description}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-700/50 backdrop-blur-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">Admin User</div>
              <div className="text-xs text-slate-300">Quản trị viên</div>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-600">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content - shifted right, scrollable, sidebar fixed */}
      <div className="flex-1 flex flex-col min-w-0 ml-0 lg:ml-72" style={{ marginLeft: '18rem' }}>
        {/* Top bar */}
  <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 h-20 flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {navigation.find(item => pathname === item.href || 
                    (item.href !== '/admin' && pathname.startsWith(item.href)))?.name || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {navigation.find(item => pathname === item.href || 
                    (item.href !== '/admin' && pathname.startsWith(item.href)))?.description || 'Tổng quan hệ thống'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="shadow-sm" asChild>
                <Link href="/">
                  Xem Website
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 bg-gray-50/50 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

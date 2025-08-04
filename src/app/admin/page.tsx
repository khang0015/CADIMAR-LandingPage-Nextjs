"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactManagement } from "@/components/admin/contact-management";
import { TranslationManagement } from "@/components/admin/translation-management";
import { BlogManagement } from "@/components/admin/blog-management";
import { PageContentManagement } from "@/components/admin/page-content-management";
import { 
  Users, 
  Languages, 
  FileText, 
  Settings,
  Shield
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("contacts");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-brand-red" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              TikTok Ads Pro Management
            </div>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger 
              value="contacts" 
              className="flex items-center space-x-2 data-[state=active]:bg-brand-red data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              <span>Contacts</span>
            </TabsTrigger>
            <TabsTrigger 
              value="translations"
              className="flex items-center space-x-2 data-[state=active]:bg-brand-red data-[state=active]:text-white"
            >
              <Languages className="h-4 w-4" />
              <span>Translations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="blogs"
              className="flex items-center space-x-2 data-[state=active]:bg-brand-red data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              <span>Blog Posts</span>
            </TabsTrigger>
            <TabsTrigger 
              value="content"
              className="flex items-center space-x-2 data-[state=active]:bg-brand-red data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              <span>Page Content</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-6">
            <ContactManagement />
          </TabsContent>

          <TabsContent value="translations" className="space-y-6">
            <TranslationManagement />
          </TabsContent>

          <TabsContent value="blogs" className="space-y-6">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <PageContentManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 
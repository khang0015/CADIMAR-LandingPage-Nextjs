"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Plus, Edit, Trash2, Save } from "lucide-react";

interface PageContent {
  id: string;
  section: string;
  lang: string;
  content: any;
  updatedAt: string;
}

interface NewPageContent {
  section: string;
  lang: string;
  content: any;
}

// Mock data for development
const mockPageContents: PageContent[] = [
  {
    id: "1",
    section: "hero",
    lang: "en",
    content: {
      title: "Transform Your Business",
      subtitle: "With Powerful Digital Marketing Solutions",
      description: "We help businesses grow through innovative digital marketing strategies."
    },
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    section: "hero",
    lang: "vi",
    content: {
      title: "Chuyển đổi Doanh nghiệp",
      subtitle: "Với Giải pháp Marketing Kỹ thuật số Mạnh mẽ",
      description: "Chúng tôi giúp doanh nghiệp phát triển thông qua các chiến lược marketing kỹ thuật số sáng tạo."
    },
    updatedAt: "2024-01-15T10:30:00Z"
  }
];

export function PageContentManagement() {
  const queryClient = useQueryClient();
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newContent, setNewContent] = useState<NewPageContent>({
    section: "",
    lang: "en",
    content: {}
  });

  const { data: pageContents = mockPageContents, isLoading } = useQuery<PageContent[]>({
    queryKey: ["/api/admin/content"],
    queryFn: async () => {
      // For now, return mock data
      return mockPageContents;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: NewPageContent) => {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content"] });
      setIsCreating(false);
      setNewContent({ section: "", lang: "en", content: {} });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<NewPageContent> }) => {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content"] });
      setEditingContent(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/content"] });
    }
  });

  const handleCreateContent = () => {
    if (!newContent.section || !newContent.content) {
      return;
    }

    try {
      const parsedContent = typeof newContent.content === 'string' 
        ? JSON.parse(newContent.content) 
        : newContent.content;
      
      createMutation.mutate({
        ...newContent,
        content: parsedContent
      });
    } catch (error) {
      // Handle JSON error silently for now
    }
  };

  const handleUpdateContent = (content: PageContent) => {
    if (!content.section || !content.content) {
      return;
    }

    try {
      const parsedContent = typeof content.content === 'string' 
        ? JSON.parse(content.content) 
        : content.content;
      
      updateMutation.mutate({
        id: content.id,
        data: {
          section: content.section,
          lang: content.lang,
          content: parsedContent
        }
      });
    } catch (error) {
      // Handle JSON error silently for now
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sectionOptions = [
    "hero",
    "services", 
    "testimonials",
    "partners",
    "contact",
    "footer"
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Page Content Management
        </h2>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-brand-red hover:bg-red-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingContent) && (
        <Card className="border-brand-red">
          <CardHeader>
            <CardTitle className="text-lg">
              {isCreating ? "Create New Page Content" : "Edit Page Content"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Section</Label>
                <Select 
                  value={isCreating ? newContent.section : editingContent?.section || ""}
                  onValueChange={(value) => {
                    if (isCreating) {
                      setNewContent(prev => ({ ...prev, section: value }));
                    } else if (editingContent) {
                      setEditingContent(prev => prev ? { ...prev, section: value } : null);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectionOptions.map((section) => (
                      <SelectItem key={section} value={section}>
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <Select 
                  value={isCreating ? newContent.lang : editingContent?.lang || "en"}
                  onValueChange={(value) => {
                    if (isCreating) {
                      setNewContent(prev => ({ ...prev, lang: value }));
                    } else if (editingContent) {
                      setEditingContent(prev => prev ? { ...prev, lang: value } : null);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="vi">Vietnamese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Content (JSON Format)</Label>
              <Textarea
                placeholder={`{
  "title": "Section Title",
  "subtitle": "Section subtitle",
  "items": [
    {
      "name": "Item 1",
      "description": "Item description"
    }
  ]
}`}
                value={
                  isCreating 
                    ? (typeof newContent.content === 'string' ? newContent.content : JSON.stringify(newContent.content, null, 2))
                    : (typeof editingContent?.content === 'string' ? editingContent.content : JSON.stringify(editingContent?.content || {}, null, 2))
                }
                onChange={(e) => {
                  const value = e.target.value;
                  if (isCreating) {
                    setNewContent(prev => ({ ...prev, content: value }));
                  } else if (editingContent) {
                    setEditingContent(prev => prev ? { ...prev, content: value } : null);
                  }
                }}
                rows={12}
                className="font-mono text-sm"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter valid JSON content for the page section. This will be used to dynamically render page content.
              </p>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={isCreating ? handleCreateContent : () => editingContent && handleUpdateContent(editingContent)}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-brand-red hover:bg-red-600"
              >
                <Save className="h-4 w-4 mr-2" />
                {createMutation.isPending || updateMutation.isPending 
                  ? "Saving..." 
                  : isCreating ? "Create Content" : "Update Content"
                }
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setEditingContent(null);
                  setNewContent({ section: "", lang: "en", content: {} });
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content List */}
      <div className="space-y-4">
        {pageContents.map((content, index) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {content.section.charAt(0).toUpperCase() + content.section.slice(1)} Section
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {content.lang.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                        {JSON.stringify(content.content, null, 2)}
                      </pre>
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Last updated: {formatDate(content.updatedAt)}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingContent(content)}
                      title="Edit content"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteMutation.mutate(content.id)}
                      disabled={deleteMutation.isPending}
                      className="text-red-600 hover:text-red-700"
                      title="Delete content"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {pageContents.length === 0 && (
        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="p-8 text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No page content found. Create content sections to customize your landing page.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Calendar, 
  Eye, 
  Trash2, 
  Search,
  Plus,
  Edit
} from "lucide-react";
import { ApiClient } from "@/lib/api-client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BlogList() {
  const queryClient = useQueryClient();
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch blogs
  const { data: blogs = [], isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['blogs'],
    queryFn: async () => {
      try {
        const response = await ApiClient.getBlogs();
        return Array.isArray(response) ? response : (response as any).data || [];
      } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
      }
    }
  });

  // Delete blog mutation
  const deleteBlogMutation = useMutation({
    mutationFn: (id: string) => ApiClient.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    }
  });

  // Toggle publish status mutation
  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      return ApiClient.updateBlog(id, { published });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    }
  });

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'published' && blog.published) ||
                         (statusFilter === 'draft' && !blog.published);
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      deleteBlogMutation.mutate(id);
    }
  };

  const handleTogglePublish = (blog: BlogPost) => {
    togglePublishMutation.mutate({
      id: blog.id,
      published: !blog.published
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Lỗi khi tải danh sách blog</p>
      </div>
    );
  }

  const stats = {
    total: blogs.length,
    published: blogs.filter(b => b.published).length,
    draft: blogs.filter(b => !b.published).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex gap-4">
        <Badge variant="outline" className="text-sm">
          Tổng: {stats.total}
        </Badge>
        <Badge variant="default" className="text-sm bg-green-600">
          Đã xuất bản: {stats.published}
        </Badge>
        <Badge variant="secondary" className="text-sm">
          Bản nháp: {stats.draft}
        </Badge>
      </div>

      {/* Filters and Actions */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Tìm kiếm theo tiêu đề, mô tả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="published">Đã xuất bản</SelectItem>
            <SelectItem value="draft">Bản nháp</SelectItem>
          </SelectContent>
        </Select>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Tạo bài viết
        </Button>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Không có bài viết nào phù hợp
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className={`p-4 border rounded-lg ${
                blog.published ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex gap-4">
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{blog.title}</h3>
                        <Badge variant={blog.published ? "default" : "secondary"}>
                          {blog.published ? "Đã xuất bản" : "Bản nháp"}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          Tạo: {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          Cập nhật: {new Date(blog.updatedAt).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Dialog open={isDialogOpen && selectedBlog?.id === blog.id} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedBlog(blog)}
                          >
                            <Eye size={16} />
                          </Button>
                        </DialogTrigger>
                        <BlogDetailDialog blog={blog} />
                      </Dialog>
                      
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Edit size={16} />
                      </Button>
                      
                      <Button
                        variant={blog.published ? "secondary" : "default"}
                        size="sm"
                        onClick={() => handleTogglePublish(blog)}
                        disabled={togglePublishMutation.isPending}
                      >
                        {blog.published ? "Ẩn" : "Xuất bản"}
                      </Button>
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteBlog(blog.id)}
                        disabled={deleteBlogMutation.isPending}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Blog Detail Dialog Component
function BlogDetailDialog({ blog }: { blog: BlogPost }) {
  return (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{blog.title}</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        )}
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Slug:</strong> {blog.slug}
          </div>
          <div>
            <strong>Trạng thái:</strong> {blog.published ? "Đã xuất bản" : "Bản nháp"}
          </div>
          <div>
            <strong>Ngày tạo:</strong> {new Date(blog.createdAt).toLocaleString('vi-VN')}
          </div>
          <div>
            <strong>Cập nhật:</strong> {new Date(blog.updatedAt).toLocaleString('vi-VN')}
          </div>
        </div>

        <div>
          <strong>Mô tả:</strong>
          <p className="text-sm text-gray-600 mt-1">{blog.excerpt}</p>
        </div>

        <div>
          <strong>Nội dung:</strong>
          <div 
            className="prose prose-sm max-w-none mt-2 p-4 bg-gray-50 rounded-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </DialogContent>
  );
}

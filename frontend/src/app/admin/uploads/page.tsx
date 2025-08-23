"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Upload, 
  Search, 
  Filter, 
  Trash2, 
  Download,
  Eye,
  Image as ImageIcon,
  FileText,
  Calendar,
  HardDrive,
  RefreshCw,
  Edit3,
  Copy,
  FolderOpen
} from "lucide-react";
import AdminLayout from "@/components/admin/admin-layout";
import ImageUpload from "@/components/admin/image-upload";
import { ApiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { formatBytes, formatDate } from "@/lib/utils";

interface UploadedFile {
  filename: string;
  originalName: string;
  path: string;
  size: number;
  mimetype: string;
  createdAt: string;
  modifiedAt: string;
  type?: 'blog' | 'avatar';
}

export default function AdminUploadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<'all' | 'blog' | 'avatar'>('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'blog' | 'avatar'>('blog');
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customPath, setCustomPath] = useState("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch files
  const { data: files = [], isLoading, error, refetch } = useQuery<UploadedFile[]>({
    queryKey: ['uploaded-files', typeFilter],
    queryFn: async () => {
      try {
        const blogRes = await fetch('/api/upload/files?type=blog');
        const avatarRes = await fetch('/api/upload/files?type=avatar');

        const blogData = await blogRes.json();
        const avatarData = await avatarRes.json();

        console.log('Blog API response:', blogData);
        console.log('Avatar API response:', avatarData);

        const blogFiles = blogData.success ? blogData.data : [];
        const avatarFiles = avatarData.success ? avatarData.data : [];

        console.log('Blog files:', blogFiles);
        console.log('Avatar files:', avatarFiles);

        const allFiles = [...blogFiles, ...avatarFiles];

        console.log('All files combined:', allFiles);
        console.log('Type filter:', typeFilter);

        let result;
        if (typeFilter === 'all') {
          result = allFiles;
        } else {
          result = allFiles.filter((file: any) => {
            console.log(`Filtering file: ${file.filename}, type: ${file.type}, filter: ${typeFilter}`);
            return file.type === typeFilter;
          });
        }

        console.log('Final result:', result);
        console.log('Result count:', result.length);
        return result;
      } catch (error) {
        console.error('Error fetching files:', error);
        return [];
      }
    }
  });

  // Delete file mutation
  const deleteFileMutation = useMutation({
    mutationFn: async ({ filename, type }: { filename: string; type: 'blog' | 'avatar' }) => {
      const response = await fetch(`/api/upload/files/${filename}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      if (!response.ok) throw new Error('Failed to delete file');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['uploaded-files'] });
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setSelectedFile(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete file",
        variant: "destructive",
      });
    }
  });

  // Rename file mutation
  const renameFileMutation = useMutation({
    mutationFn: async ({ oldFilename, newFilename, type }: { oldFilename: string; newFilename: string; type: 'blog' | 'avatar' }) => {
      const response = await fetch(`/api/upload/files/${oldFilename}/rename`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newFilename, type })
      });
      if (!response.ok) throw new Error('Failed to rename file');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['uploaded-files'] });
      toast({
        title: "Success",
        description: "File renamed successfully",
      });
      setIsRenameDialogOpen(false);
      setSelectedFile(null);
      setNewFileName("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to rename file",
        variant: "destructive",
      });
    }
  });

  // Filter files based on search
  const filteredFiles = files.filter(file => 
    file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.originalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadSuccess = (file: any) => {
    queryClient.invalidateQueries({ queryKey: ['uploaded-files'] });
    setIsUploadOpen(false);
    toast({
      title: "Success",
      description: "File uploaded successfully",
    });
  };

  const handleDelete = (file: UploadedFile) => {
    setSelectedFile(file);
    setIsDeleteDialogOpen(true);
  };

  const handleRename = (file: UploadedFile) => {
    setSelectedFile(file);
    setNewFileName(file.originalName);
    setIsRenameDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedFile) {
      deleteFileMutation.mutate({
        filename: selectedFile.filename,
        type: selectedFile.type || 'blog'
      });
    }
  };

  const confirmRename = () => {
    if (selectedFile && newFileName.trim()) {
      renameFileMutation.mutate({
        oldFilename: selectedFile.filename,
        newFilename: newFileName.trim(),
        type: selectedFile.type || 'blog'
      });
    }
  };

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(`/${path}`);
    toast({
      title: "Copied",
      description: "File path copied to clipboard",
    });
  };

  const handleDownload = (file: UploadedFile) => {
    const link = document.createElement('a');
    link.href = `/${file.path}`;
    link.download = file.originalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileIcon = (mimetype: string) => {
    if (mimetype.startsWith('image/')) {
      return <ImageIcon className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog': return 'bg-blue-100 text-blue-800';
      case 'avatar': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý File</h1>
            <p className="text-gray-600">Upload và quản lý ảnh</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Làm mới
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                console.log('Testing API directly...');
                try {
                  const response = await fetch('/api/upload/files?type=blog');
                  const data = await response.json();
                  console.log('Direct API test result:', data);
                  alert(`API Test: ${data.success ? 'Success' : 'Failed'} - ${data.data?.length || 0} files found`);
                } catch (error) {
                  console.error('API test failed:', error);
                  alert('API Test Failed: ' + error);
                }
              }}
            >
              Test API
            </Button>
            <Button onClick={() => setIsUploadOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="search">Tìm kiếm</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Tìm theo tên file..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Loại file</Label>
                <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="blog">Blog Images</SelectItem>
                    <SelectItem value="avatar">Avatars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <HardDrive className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tổng files</p>
                  <p className="text-2xl font-bold">{files.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <ImageIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Blog Images</p>
                  <p className="text-2xl font-bold">{files.filter(f => f.type === 'blog').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <FolderOpen className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avatars</p>
                  <p className="text-2xl font-bold">{files.filter(f => f.type === 'avatar').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Files Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Files ({filteredFiles.length})</CardTitle>
            <CardDescription>
              Quản lý và tổ chức files upload
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>{searchQuery ? 'Không tìm thấy file nào' : 'Chưa có file nào được upload'}</p>
                <p className="text-sm mt-2">Debug: Total files loaded: {files.length}</p>
                <p className="text-sm">Type filter: {typeFilter}</p>
                <p className="text-sm">Search query: "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <div
                    key={file.filename}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    {/* File Preview */}
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      {file.mimetype.startsWith('image/') ? (
                        <img
                          src={`/${file.path}`}
                          alt={file.originalName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Image load error:', file.path);
                            e.currentTarget.style.display = 'none';
                          }}
                          onLoad={() => {
                            console.log('Image loaded successfully:', file.path);
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {getFileIcon(file.mimetype)}
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={getTypeColor(file.type || 'blog')}>
                          {file.type === 'avatar' ? 'Avatar' : 'Blog'}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatBytes(file.size)}
                        </span>
                      </div>
                      
                      <h3 className="font-medium text-sm truncate" title={file.originalName}>
                        {file.originalName}
                      </h3>
                      
                      <p className="text-xs text-gray-500 truncate" title={file.filename}>
                        {file.filename}
                      </p>
                      
                      <p className="text-xs text-gray-500">
                        {formatDate(file.createdAt)}
                      </p>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-1 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyPath(file.path)}
                          title="Copy path"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(file)}
                          title="Download"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/${file.path}`, '_blank')}
                          title="View"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRename(file)}
                          title="Rename"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="pt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(file)}
                          className="w-full text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload Dialog */}
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogContent className="max-w-2xl bg-white border border-gray-200 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Upload File</DialogTitle>
              <DialogDescription className="text-gray-600">
                Chọn loại file và upload ảnh mới
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Loại file</Label>
                <Select value={uploadType} onValueChange={(value: any) => setUploadType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Image (uploads/blog/)</SelectItem>
                    <SelectItem value="avatar">Avatar (uploads/avatars/)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="customPath">Thư mục tùy chỉnh (tùy chọn)</Label>
                <Input
                  id="customPath"
                  placeholder="Ví dụ: products, gallery, etc..."
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Để trống để sử dụng thư mục mặc định. Sẽ tạo: uploads/{customPath || uploadType}/
                </p>
              </div>

              <ImageUpload
                type={uploadType}
                customPath={customPath}
                onUploadSuccess={handleUploadSuccess}
                onUploadError={(error) => {
                  toast({
                    title: "Error",
                    description: error,
                    variant: "destructive",
                  });
                }}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Rename Dialog */}
        <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
          <DialogContent className="bg-white border border-gray-200 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Đổi tên file</DialogTitle>
              <DialogDescription className="text-gray-600">
                Nhập tên mới cho file "{selectedFile?.originalName}"
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="newFileName">Tên file mới</Label>
                <Input
                  id="newFileName"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="Nhập tên file mới..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsRenameDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={confirmRename}
                disabled={renameFileMutation.isPending || !newFileName.trim()}
              >
                {renameFileMutation.isPending ? 'Đang đổi tên...' : 'Đổi tên'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-white border border-gray-200 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Xác nhận xóa</DialogTitle>
              <DialogDescription className="text-gray-600">
                Bạn có chắc chắn muốn xóa file "{selectedFile?.originalName}"?
                Hành động này không thể hoàn tác.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={deleteFileMutation.isPending}
              >
                {deleteFileMutation.isPending ? 'Đang xóa...' : 'Xóa'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

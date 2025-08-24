"use client";

import { useState, useRef, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  filename: string;
  originalName: string;
  path: string;
  size: number;
  mimetype: string;
}

interface ImageUploadProps {
  onUploadSuccess?: (file: UploadedFile) => void;
  onUploadError?: (error: string) => void;
  type?: 'blog' | 'avatar';
  customPath?: string;
  maxSize?: number; // in MB
  accept?: string;
  className?: string;
  multiple?: boolean;
}

interface UploadProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  result?: UploadedFile;
  error?: string;
}

export default function ImageUpload({
  onUploadSuccess,
  onUploadError,
  type = 'blog',
  customPath,
  maxSize = 5,
  accept = "image/*",
  className,
  multiple = false
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', type);
      if (customPath) {
        formData.append('customPath', customPath);
      }

      // Debug what we're sending
      console.log('=== FRONTEND UPLOAD DEBUG ===');
      console.log('Uploading file:', file.name);
      console.log('Type:', type);
      console.log('Custom path:', customPath);
      console.log('FormData entries:');
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      return response.json();
    },
    onSuccess: (data, file) => {
      setUploads(prev => prev.map(upload => 
        upload.file === file 
          ? { ...upload, status: 'success', progress: 100, result: data.data }
          : upload
      ));
      
      if (onUploadSuccess && data.data) {
        onUploadSuccess(data.data);
      }
      
      // Invalidate queries to refresh file lists
      queryClient.invalidateQueries({ queryKey: ['uploaded-files'] });
    },
    onError: (error: any, file) => {
      setUploads(prev => prev.map(upload => 
        upload.file === file 
          ? { ...upload, status: 'error', error: error.message }
          : upload
      ));
      
      if (onUploadError) {
        onUploadError(error.message);
      }
    }
  });

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check specific image types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return 'Only JPEG, PNG, GIF, and WebP images are allowed';
    }

    return null;
  };

  const handleFiles = useCallback((files: FileList) => {
    const fileArray = Array.from(files);
    
    if (!multiple && fileArray.length > 1) {
      if (onUploadError) {
        onUploadError('Only one file can be uploaded at a time');
      }
      return;
    }

    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      if (onUploadError) {
        onUploadError(errors.join('\n'));
      }
      return;
    }

    // Add files to upload queue
    const newUploads: UploadProgress[] = validFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }));

    setUploads(prev => [...prev, ...newUploads]);

    // Start uploads
    validFiles.forEach(file => {
      uploadMutation.mutate(file);
    });
  }, [multiple, onUploadError, uploadMutation]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [handleFiles]);

  const removeUpload = (file: File) => {
    setUploads(prev => prev.filter(upload => upload.file !== file));
  };

  const clearAll = () => {
    setUploads([]);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
          isDragOver 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 hover:border-gray-400"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {customPath
                ? `uploads/${customPath}/`
                : type === 'avatar'
                  ? 'uploads/avatars/'
                  : 'uploads/blog/'
              } • Max {maxSize}MB • PNG, JPG, GIF, WebP
            </p>
          </div>
          
          <Button type="button" variant="outline">
            Choose Files
          </Button>
        </div>
      </div>

      {/* Upload Progress */}
      {uploads.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">
              Uploading {uploads.length} file{uploads.length > 1 ? 's' : ''}
            </h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearAll}
            >
              Clear All
            </Button>
          </div>
          
          {uploads.map((upload, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {upload.file.type.startsWith('image/') ? (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  ) : (
                    <FileText className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {upload.file.name}
                    </p>
                    <div className="flex items-center gap-2">
                      {upload.status === 'uploading' && (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      )}
                      {upload.status === 'success' && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      {upload.status === 'error' && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeUpload(upload.file)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    {upload.status === 'uploading' && (
                      <Progress value={upload.progress} className="h-2" />
                    )}
                    {upload.status === 'success' && upload.result && (
                      <p className="text-xs text-green-600">
                        Uploaded successfully • {upload.result.path}
                      </p>
                    )}
                    {upload.status === 'error' && (
                      <p className="text-xs text-red-600">
                        {upload.error || 'Upload failed'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

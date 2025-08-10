// Helper function để xử lý image URLs
export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return '/blogs/default-blog.jpg';
  
  // Nếu đã là URL đầy đủ thì giữ nguyên
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Nếu là đường dẫn local từ DB, Next.js sẽ tự động proxy qua backend
  return imagePath;
};

// Format date helper
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get first tag helper
export const getFirstTag = (tags: string | null | undefined): string => {
  if (!tags) return 'Blog';
  return tags.split(',')[0].trim();
};

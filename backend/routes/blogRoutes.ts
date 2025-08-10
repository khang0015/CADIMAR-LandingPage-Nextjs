import express from 'express';
import { BlogService } from '../services/BlogService.js';
import { validateBlogData } from '../middleware/validation.js';

const router = express.Router();

// GET /api/blogs - Get all blogs
router.get('/', async (req, res) => {
  try {
    const { status, lang, featured, limit, offset } = req.query;
    
    // Don't pass empty/undefined filters to avoid filtering
    const filters: any = {};
    if (status) filters.status = status as 'draft' | 'published';
    if (lang) filters.lang = lang as string;
    if (featured !== undefined) filters.featured = featured === 'true';
    if (limit) filters.limit = parseInt(limit as string);
    if (offset) filters.offset = parseInt(offset as string);
    
    console.log('Filters:', filters);
    const blogs = await BlogService.getAll(filters);
    console.log('Found blogs:', blogs.length);
    
    res.json({
      success: true,
      data: blogs,
      total: blogs.length,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blogs',
    });
  }
});

// GET /api/blogs/search - Search blogs
router.get('/search', async (req, res) => {
  try {
    const { q, lang } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      });
    }
    
    const results = await BlogService.search(q as string, lang as string);
    
    res.json({
      success: true,
      data: results,
      total: results.length,
    });
  } catch (error) {
    console.error('Error searching blogs:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed',
    });
  }
});

// GET /api/blogs/featured - Get featured blogs
router.get('/featured', async (req, res) => {
  try {
    const { lang, limit } = req.query;
    
    const blogs = await BlogService.getFeatured(
      lang as string,
      limit ? parseInt(limit as string) : undefined
    );
    
    res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured blogs',
    });
  }
});

// GET /api/blogs/:slug - Get blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await BlogService.getBySlug(slug);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
    }
    
    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog',
    });
  }
});

// GET /api/blogs/:id/related - Get related blogs
router.get('/:id/related', async (req, res) => {
  try {
    const { id } = req.params;
    const { limit } = req.query;
    
    const blogs = await BlogService.getRelated(
      parseInt(id),
      undefined,
      limit ? parseInt(limit as string) : undefined
    );
    
    res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch related blogs',
    });
  }
});

// POST /api/blogs - Create new blog
router.post('/', validateBlogData, async (req, res) => {
  try {
    // Check if slug already exists
    const slugExists = await BlogService.slugExists(req.body.slug);
    if (slugExists) {
      return res.status(400).json({
        success: false,
        error: 'Slug already exists',
      });
    }
    
    const blog = await BlogService.create(req.body);
    
    res.status(201).json({
      success: true,
      data: blog,
      message: 'Blog created successfully',
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create blog',
    });
  }
});

// PUT /api/blogs/:id - Update blog
router.put('/:id', validateBlogData, async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    
    // Check if slug already exists (excluding current blog)
    if (req.body.slug) {
      const slugExists = await BlogService.slugExists(req.body.slug, numericId);
      if (slugExists) {
        return res.status(400).json({
          success: false,
          error: 'Slug already exists',
        });
      }
    }
    
    const blog = await BlogService.update(numericId, req.body);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
    }
    
    res.json({
      success: true,
      data: blog,
      message: 'Blog updated successfully',
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update blog',
    });
  }
});

// DELETE /api/blogs/:id - Delete blog
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    
    // Check if blog exists
    const blog = await BlogService.getById(numericId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found',
      });
    }
    
    await BlogService.delete(numericId);
    
    res.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete blog',
    });
  }
});

export default router;

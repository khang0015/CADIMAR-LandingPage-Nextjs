import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Blog validation schema
const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  slug: z.string().optional().refine((val) => {
    if (!val || val === '') return true;
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val);
  }, 'Invalid slug format'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  featured_image: z.string().optional(),
  featured: z.boolean().optional(),
  status: z.enum(['draft', 'published']).optional(),
  lang: z.string().min(1, 'Language is required').max(2, 'Language code too long'),
  meta_title: z.string().max(255, 'Meta title too long').optional(),
  meta_description: z.string().optional(),
  tags: z.string().optional(),
  author_name: z.string().max(255, 'Author name too long').optional(),
  author_avatar_url: z.string().optional(),
  author_position: z.string().max(255, 'Author position too long').optional(),
  reading_time: z.number().int().min(1).optional(),
  published_at: z.string().optional().refine((val) => {
    if (!val || val === '') return true;
    return !isNaN(Date.parse(val));
  }, 'Invalid date format'),
});

// Contact validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name too long'),
  email: z.string().email('Invalid email format').max(255, 'Email too long'),
  phone: z.string().max(50, 'Phone too long').optional(),
  company: z.string().max(255, 'Company name too long').optional(),
  serviceInterested: z.string().max(100, 'Service interested too long').optional(),
  message: z.string().min(1, 'Message is required').max(5000, 'Message too long'),
  source: z.string().max(100, 'Source too long').optional(),
});

// Translation validation schema
const translationSchema = z.object({
  lang: z.string().min(1, 'Language is required').max(10, 'Language code too long'),
  key: z.string().min(1, 'Key is required').max(255, 'Key too long'),
  value: z.string().min(1, 'Value is required'),
  category: z.string().max(100, 'Category too long').optional(),
  description: z.string().optional(),
});

// Language validation schema
const languageSchema = z.object({
  code: z.string().min(1, 'Code is required').max(10, 'Code too long')
    .regex(/^[a-z]{2,3}(-[A-Z]{2})?$/, 'Invalid language code format'),
  name: z.string().min(1, 'Name is required').max(255, 'Name too long'),
  nativeName: z.string().min(1, 'Native name is required').max(255, 'Native name too long'),
  flag: z.string().max(255, 'Flag too long').optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

// Generic validation middleware
function createValidationMiddleware(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        const errors = result.error.errors.map(error => ({
          field: error.path.join('.'),
          message: error.message,
        }));
        
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors,
        });
      }
      
      // Replace req.body with validated data
      req.body = result.data;
      next();
    } catch (error) {
      console.error('Validation middleware error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal validation error',
      });
    }
  };
}

// Export validation middlewares
export const validateBlogData = createValidationMiddleware(blogSchema);
export const validateContactData = createValidationMiddleware(contactSchema);
export const validateTranslationData = createValidationMiddleware(translationSchema);
export const validateLanguageData = createValidationMiddleware(languageSchema);

// Validation for partial updates (PATCH requests)
export const validateBlogDataPartial = createValidationMiddleware(blogSchema.partial());
export const validateContactDataPartial = createValidationMiddleware(contactSchema.partial());
export const validateTranslationDataPartial = createValidationMiddleware(translationSchema.partial());
export const validateLanguageDataPartial = createValidationMiddleware(languageSchema.partial());

// Manual validation functions (for use in services)
export function validateBlogPostData(data: any) {
  const result = blogSchema.safeParse(data);
  return {
    valid: result.success,
    data: result.success ? result.data : null,
    errors: result.success ? null : result.error.errors,
  };
}

export function validateContactFormData(data: any) {
  const result = contactSchema.safeParse(data);
  return {
    valid: result.success,
    data: result.success ? result.data : null,
    errors: result.success ? null : result.error.errors,
  };
}

export function validateTranslationFormData(data: any) {
  const result = translationSchema.safeParse(data);
  return {
    valid: result.success,
    data: result.success ? result.data : null,
    errors: result.success ? null : result.error.errors,
  };
}

export function validateLanguageFormData(data: any) {
  const result = languageSchema.safeParse(data);
  return {
    valid: result.success,
    data: result.success ? result.data : null,
    errors: result.success ? null : result.error.errors,
  };
}

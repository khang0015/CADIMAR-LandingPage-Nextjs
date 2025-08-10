import express from 'express';
import { TranslationService, LanguageService } from '../services/TranslationService.js';

const router = express.Router();

// GET /api/translations - Get all translations
router.get('/', async (req, res) => {
  try {
    const { lang, category, limit, offset } = req.query;
    
    const filters = {
      lang: lang as string,
      category: category as string,
      limit: limit ? parseInt(limit as string) : undefined,
      offset: offset ? parseInt(offset as string) : undefined,
    };
    
    const translations = await TranslationService.getAll(filters);
    
    res.json({
      success: true,
      data: translations,
      total: translations.length,
    });
  } catch (error) {
    console.error('Error fetching translations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch translations',
    });
  }
});

// GET /api/translations/:lang - Get translations for a specific language as key-value map
router.get('/:lang', async (req, res) => {
  try {
    const { lang } = req.params;
    const { category } = req.query;
    
    const translationMap = await TranslationService.getTranslationMap(
      lang,
      category as string
    );
    
    res.json({
      success: true,
      data: translationMap,
    });
  } catch (error) {
    console.error('Error fetching translation map:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch translation map',
    });
  }
});

// GET /api/translations/search - Search translations
router.get('/search', async (req, res) => {
  try {
    const { q, lang } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      });
    }
    
    const results = await TranslationService.search(q as string, lang as string);
    
    res.json({
      success: true,
      data: results,
      total: results.length,
    });
  } catch (error) {
    console.error('Error searching translations:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed',
    });
  }
});

// GET /api/translations/categories - Get all translation categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await TranslationService.getCategories();
    
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching translation categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
    });
  }
});

// POST /api/translations - Create or update translation
router.post('/', async (req, res) => {
  try {
    const { lang, key, value, category, description } = req.body;
    
    if (!lang || !key || !value) {
      return res.status(400).json({
        success: false,
        error: 'lang, key, and value are required',
      });
    }
    
    const translation = await TranslationService.upsert({
      lang,
      key,
      value,
      category,
      description,
    });
    
    res.status(201).json({
      success: true,
      data: translation,
      message: 'Translation saved successfully',
    });
  } catch (error) {
    console.error('Error saving translation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save translation',
    });
  }
});

// POST /api/translations/bulk - Bulk import translations
router.post('/bulk', async (req, res) => {
  try {
    const { translations } = req.body;
    
    if (!Array.isArray(translations)) {
      return res.status(400).json({
        success: false,
        error: 'translations must be an array',
      });
    }
    
    const results = await TranslationService.bulkImport(translations);
    
    res.json({
      success: true,
      data: results,
      message: `${results.length} translations imported successfully`,
    });
  } catch (error) {
    console.error('Error bulk importing translations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to import translations',
    });
  }
});

// PUT /api/translations/:id - Update translation
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const translation = await TranslationService.update(id, req.body);
    
    if (!translation) {
      return res.status(404).json({
        success: false,
        error: 'Translation not found',
      });
    }
    
    res.json({
      success: true,
      data: translation,
      message: 'Translation updated successfully',
    });
  } catch (error) {
    console.error('Error updating translation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update translation',
    });
  }
});

// DELETE /api/translations/:id - Delete translation
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await TranslationService.delete(id);
    
    res.json({
      success: true,
      message: 'Translation deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting translation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete translation',
    });
  }
});

export default router;

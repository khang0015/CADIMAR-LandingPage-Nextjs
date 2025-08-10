import express from 'express';
import { LanguageService } from '../services/TranslationService.js';

const router = express.Router();

// GET /api/languages - Get all languages
router.get('/', async (req, res) => {
  try {
    const { active } = req.query;
    const languages = await LanguageService.getAll(active === 'true');
    
    res.json({
      success: true,
      data: languages,
    });
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch languages',
    });
  }
});

// GET /api/languages/:code - Get language by code
router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const language = await LanguageService.getByCode(code);
    
    if (!language) {
      return res.status(404).json({
        success: false,
        error: 'Language not found',
      });
    }
    
    res.json({
      success: true,
      data: language,
    });
  } catch (error) {
    console.error('Error fetching language:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch language',
    });
  }
});

// POST /api/languages - Create new language
router.post('/', async (req, res) => {
  try {
    const { code, name, nativeName, flag, isActive, sortOrder } = req.body;
    
    if (!code || !name || !nativeName) {
      return res.status(400).json({
        success: false,
        error: 'code, name, and nativeName are required',
      });
    }
    
    // Check if language code already exists
    const exists = await LanguageService.codeExists(code);
    if (exists) {
      return res.status(400).json({
        success: false,
        error: 'Language code already exists',
      });
    }
    
    const language = await LanguageService.create({
      code,
      name,
      nativeName,
      flag,
      isActive,
      sortOrder,
    });
    
    res.status(201).json({
      success: true,
      data: language,
      message: 'Language created successfully',
    });
  } catch (error) {
    console.error('Error creating language:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create language',
    });
  }
});

// PUT /api/languages/:id - Update language
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    
    // Check if language code already exists (excluding current language)
    if (code) {
      const exists = await LanguageService.codeExists(code, id);
      if (exists) {
        return res.status(400).json({
          success: false,
          error: 'Language code already exists',
        });
      }
    }
    
    const language = await LanguageService.update(id, req.body);
    
    if (!language) {
      return res.status(404).json({
        success: false,
        error: 'Language not found',
      });
    }
    
    res.json({
      success: true,
      data: language,
      message: 'Language updated successfully',
    });
  } catch (error) {
    console.error('Error updating language:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update language',
    });
  }
});

// DELETE /api/languages/:id - Delete language
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await LanguageService.delete(id);
    
    res.json({
      success: true,
      message: 'Language deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting language:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete language',
    });
  }
});

export default router;

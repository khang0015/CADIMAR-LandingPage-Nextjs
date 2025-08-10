import express from 'express';
import { ContactService } from '../services/ContactService.js';
import { validateContactData } from '../middleware/validation.js';

const router = express.Router();

// GET /api/contacts - Get all contacts
router.get('/', async (req, res) => {
  try {
    const { status, priority, responded, limit, offset } = req.query;
    
    const filters = {
      status: status as 'new' | 'in-progress' | 'responded' | 'closed',
      priority: priority as 'low' | 'normal' | 'high',
      responded: responded === 'true',
      limit: limit ? parseInt(limit as string) : undefined,
      offset: offset ? parseInt(offset as string) : undefined,
    };
    
    const contacts = await ContactService.getAll(filters);
    
    res.json({
      success: true,
      data: contacts,
      total: contacts.length,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contacts',
    });
  }
});

// GET /api/contacts/search - Search contacts
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      });
    }
    
    const results = await ContactService.search(q as string);
    
    res.json({
      success: true,
      data: results,
      total: results.length,
    });
  } catch (error) {
    console.error('Error searching contacts:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed',
    });
  }
});

// GET /api/contacts/stats - Get contact statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await ContactService.getStats();
    
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics',
    });
  }
});

// GET /api/contacts/:id - Get contact by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactService.getById(id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found',
      });
    }
    
    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact',
    });
  }
});

// POST /api/contacts - Create new contact
router.post('/', validateContactData, async (req, res) => {
  try {
    const contact = await ContactService.create(req.body);
    
    res.status(201).json({
      success: true,
      data: contact,
      message: 'Contact message sent successfully',
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send contact message',
    });
  }
});

// PUT /api/contacts/:id - Update contact
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactService.update(id, req.body);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found',
      });
    }
    
    res.json({
      success: true,
      data: contact,
      message: 'Contact updated successfully',
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contact',
    });
  }
});

// PUT /api/contacts/:id/respond - Mark contact as responded
router.put('/:id/respond', async (req, res) => {
  try {
    const { id } = req.params;
    const { respondedBy, adminNote } = req.body;
    
    if (!respondedBy) {
      return res.status(400).json({
        success: false,
        error: 'respondedBy is required',
      });
    }
    
    const contact = await ContactService.markAsResponded(id, respondedBy, adminNote);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found',
      });
    }
    
    res.json({
      success: true,
      data: contact,
      message: 'Contact marked as responded',
    });
  } catch (error) {
    console.error('Error marking contact as responded:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark contact as responded',
    });
  }
});

// DELETE /api/contacts/:id - Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if contact exists
    const contact = await ContactService.getById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found',
      });
    }
    
    await ContactService.delete(id);
    
    res.json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete contact',
    });
  }
});

export default router;

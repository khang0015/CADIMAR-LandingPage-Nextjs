import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    let uploadDir;

    console.log('Upload request - type:', req.body.type, 'customPath:', req.body.customPath);

    if (req.body.customPath) {
      uploadDir = path.join(process.cwd(), 'uploads', req.body.customPath);
    } else {
      // Handle avatar type correctly
      if (req.body.type === 'avatar') {
        uploadDir = path.join(process.cwd(), 'uploads', 'avatars');
      } else {
        uploadDir = path.join(process.cwd(), 'uploads', 'blog');
      }
    }

    console.log('Upload destination:', uploadDir);

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('Created directory:', uploadDir);
    }

    cb(null, uploadDir);
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + ext;
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// POST /api/upload - Upload single image
router.post('/', (req: any, res: Response) => {
  // Create dynamic multer instance based on request
  const dynamicUpload = multer({
    storage: multer.diskStorage({
      destination: (req: any, file: any, cb: any) => {
        const type = req.body.type || 'blog';
        const customPath = req.body.customPath;

        console.log('Dynamic upload - type:', type, 'customPath:', customPath);

        let uploadDir;
        if (customPath) {
          uploadDir = path.join(process.cwd(), 'uploads', customPath);
        } else {
          if (type === 'avatar') {
            uploadDir = path.join(process.cwd(), 'uploads', 'avatars');
          } else {
            uploadDir = path.join(process.cwd(), 'uploads', 'blog');
          }
        }

        console.log('Dynamic upload destination:', uploadDir);

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
      },
      filename: (req: any, file: any, cb: any) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const filename = file.fieldname + '-' + uniqueSuffix + ext;
        cb(null, filename);
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req: any, file: any, cb: any) => {
      const allowedTypes = /jpeg|jpg|png|gif|webp/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'));
      }
    }
  }).single('image');

  dynamicUpload(req, res, (err: any) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    // Debug request body
    console.log('=== UPLOAD DEBUG ===');
    console.log('req.body:', req.body);
    console.log('req.body.type:', req.body.type);
    console.log('req.body.customPath:', req.body.customPath);
    console.log('typeof req.body.type:', typeof req.body.type);

    const type = req.body.type || 'blog';
    const customPath = req.body.customPath;

    console.log('Final type after default:', type);

    let relativePath: string;
    if (customPath) {
      relativePath = `uploads/${customPath}/${req.file.filename}`;
    } else {
      if (type === 'avatar') {
        relativePath = `uploads/avatars/${req.file.filename}`;
      } else {
        relativePath = `uploads/blog/${req.file.filename}`;
      }
    }

    console.log('Upload completed - type:', type, 'path:', relativePath);

    res.json({
      success: true,
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: relativePath,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to upload file'
      });
    }
  });
});

// GET /api/upload/files - List files in directory
router.get('/files', (req: any, res: any) => {
  try {
    const { type = 'blog' } = req.query;

    // Simple mapping
    let folderName = type;
    if (type === 'avatar') {
      folderName = 'avatars';
    }

    const uploadDir = path.join(process.cwd(), 'uploads', folderName);

    console.log(`=== API called with type: ${type} ===`);
    console.log(`Folder name: ${folderName}`);
    console.log(`Looking for files in: ${uploadDir}`);
    console.log(`Directory exists: ${fs.existsSync(uploadDir)}`);

    if (!fs.existsSync(uploadDir)) {
      console.log('Directory not found, returning empty array');
      return res.json({ success: true, data: [] });
    }

    const allFiles = fs.readdirSync(uploadDir);
    console.log(`All files in directory: ${allFiles}`);

    const imageFiles = allFiles.filter((file: string) => {
      const ext = path.extname(file).toLowerCase();
      const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      console.log(`File: ${file}, Extension: ${ext}, Is Image: ${isImage}`);
      return isImage;
    });

    console.log(`Image files: ${imageFiles}`);

    const files = imageFiles.map((file: string) => {
      const stats = fs.statSync(path.join(uploadDir, file));
      const fileData = {
        filename: file,
        originalName: file,
        path: `uploads/${folderName}/${file}`,
        size: stats.size,
        mimetype: getMimeType(file),
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        type: type // Keep original type (avatar or blog)
      };
      console.log(`Processed file:`, fileData);
      return fileData;
    });

    console.log(`=== Final result: ${files.length} files ===`);
    console.log('Files:', files);

    res.json({
      success: true,
      data: files,
      total: files.length
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list files'
    });
  }
});

// PUT /api/upload/files/:filename/rename - Rename a file
router.put('/files/:filename/rename', async (req: any, res: any) => {
  try {
    const { filename } = req.params;
    const { newFilename, type } = req.body;

    if (!newFilename) {
      return res.status(400).json({
        success: false,
        error: 'New filename is required',
      });
    }

    const uploadDir = type === 'avatar'
      ? path.join(process.cwd(), 'uploads/avatars')
      : path.join(process.cwd(), 'uploads/blog');

    const oldPath = path.join(uploadDir, filename);
    const newPath = path.join(uploadDir, newFilename);

    // Check if old file exists
    const fs = require('fs');
    if (!fs.existsSync(oldPath)) {
      return res.status(404).json({
        success: false,
        error: 'File not found',
      });
    }

    // Check if new filename already exists
    if (fs.existsSync(newPath)) {
      return res.status(409).json({
        success: false,
        error: 'A file with that name already exists',
      });
    }

    // Rename file
    fs.renameSync(oldPath, newPath);

    res.json({
      success: true,
      message: 'File renamed successfully',
      data: {
        oldFilename: filename,
        newFilename: newFilename,
        path: `uploads/${type}/${newFilename}`
      }
    });
  } catch (error) {
    console.error('Error renaming file:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to rename file',
    });
  }
});

// DELETE /api/upload/files/:filename - Delete a file
router.delete('/files/:filename', async (req: any, res: any) => {
  try {
    const { filename } = req.params;
    const { type } = req.body;

    const uploadDir = type === 'avatar'
      ? path.join(process.cwd(), 'uploads/avatars')
      : path.join(process.cwd(), 'uploads/blog');

    const filePath = path.join(uploadDir, filename);

    // Check if file exists
    const fs = require('fs');
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: 'File not found',
      });
    }

    // Delete file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete file',
    });
  }
});

// Helper function to get MIME type
function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// GET /api/upload/debug - Debug endpoint
router.get('/debug', (req, res) => {

  const debugInfo = {
    cwd: process.cwd(),
    __dirname: __dirname,
    paths: {
      uploadsFromCwd: path.join(process.cwd(), 'uploads'),
      uploadsFromDirname: path.join(__dirname, '../uploads'),
      absolutePath: 'D:\\Code\\Cadimar-nextjs\\cadimar-landingpage-next\\uploads'
    },
    exists: {},
    contents: {}
  };

  // Check each path
  Object.entries(debugInfo.paths).forEach(([key, testPath]) => {
    debugInfo.exists[key] = fs.existsSync(testPath);
    if (fs.existsSync(testPath)) {
      try {
        debugInfo.contents[key] = fs.readdirSync(testPath);
      } catch (error) {
        debugInfo.contents[key] = `Error reading: ${error.message}`;
      }
    }
  });

  res.json(debugInfo);
});

// GET /api/upload/test-files - Test files directly
router.get('/test-files', (req, res) => {

  // Test all possible paths
  const testPaths = [
    'D:\\Code\\Cadimar-nextjs\\cadimar-landingpage-next\\uploads\\blog',
    'D:\\Code\\Cadimar-nextjs\\cadimar-landingpage-next\\uploads\\avatars',
    path.join(process.cwd(), 'uploads', 'blog'),
    path.join(process.cwd(), 'uploads', 'avatars'),
    path.join(__dirname, '..', 'uploads', 'blog'),
    path.join(__dirname, '..', 'uploads', 'avatars')
  ];

  const results = {};

  testPaths.forEach(testPath => {
    try {
      if (fs.existsSync(testPath)) {
        const files = fs.readdirSync(testPath);
        results[testPath] = {
          exists: true,
          files: files,
          count: files.length
        };
      } else {
        results[testPath] = {
          exists: false,
          files: [],
          count: 0
        };
      }
    } catch (error) {
      results[testPath] = {
        exists: false,
        error: error.message,
        files: [],
        count: 0
      };
    }
  });

  res.json({
    success: true,
    cwd: process.cwd(),
    __dirname: __dirname,
    results: results
  });
});

// GET /api/upload/test - Test endpoint
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Upload endpoint is working',
    timestamp: new Date().toISOString()
  });
});

export default router;

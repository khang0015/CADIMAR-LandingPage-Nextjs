import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import blogRoutes from './routes/blogRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import translationRoutes from './routes/translationRoutes.js';
import languageRoutes from './routes/languageRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Fix cho ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables từ root .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const app = express();
const PORT = Number(process.env.BACKEND_PORT) || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

console.log('🔧 Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: PORT,
  FRONTEND_URL: FRONTEND_URL,
  DB_NAME: process.env.DB_NAME,
});

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: [
    FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:3001',
    'http://172.31.16.1:3000',
    'http://172.31.16.1:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001'
  ],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    port: PORT,
    env: process.env.NODE_ENV,
    database: process.env.DB_NAME
  });
});

// API logging middleware
app.use('/api', (req, res, next) => {
  console.log(`[API] ${req.method} ${req.path}`);
  next();
});

// API routes
app.use('/api/blogs', blogRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/translations', translationRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/upload', uploadRoutes);

// Example API endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend API is working!', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API test: http://localhost:${PORT}/api/test`);
});

export default app;
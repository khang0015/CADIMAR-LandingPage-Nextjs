import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '..', '.env.local') });

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cadimar_db',
  charset: 'utf8mb4',
  // Connection pool settings
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  // Keep connection alive
  keepAliveInitialDelay: 0,
  enableKeepAlive: true,
};

console.log('🔧 Database config:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database,
});

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Create Drizzle instance with pool
export const db = drizzle(pool);

// Export pool for manual queries if needed
export { pool as connection };

// Test connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    // Retry connection after 5 seconds
    setTimeout(testConnection, 5000);
  }
}

// Initial connection test
testConnection();

// Handle pool events
pool.on('connection', (connection) => {
  console.log('📡 New database connection established as id ' + connection.threadId);
});

pool.on('error', (err) => {
  console.error('❌ Database pool error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('🔄 Attempting to reconnect to database...');
    testConnection();
  }
});

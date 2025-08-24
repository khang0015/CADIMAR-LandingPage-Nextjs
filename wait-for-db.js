#!/usr/bin/env node

import mysql from 'mysql2/promise';
import { setTimeout } from 'timers/promises';

const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_NAME || 'cadimar_db',
};

console.log('🔄 Waiting for database to be ready...');
console.log('Database config:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database,
});

async function waitForDatabase() {
  const maxRetries = 30;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      console.log(`🔍 Attempt ${retries + 1}/${maxRetries} - Connecting to database...`);
      
      const connection = await mysql.createConnection(dbConfig);
      await connection.ping();
      await connection.end();
      
      console.log('✅ Database is ready!');
      return true;
    } catch (error) {
      retries++;
      console.log(`❌ Database not ready (attempt ${retries}/${maxRetries}):`, error.message);
      
      if (retries >= maxRetries) {
        console.error('💥 Failed to connect to database after maximum retries');
        process.exit(1);
      }
      
      console.log('⏳ Waiting 2 seconds before retry...');
      await setTimeout(2000);
    }
  }
}

waitForDatabase().catch((error) => {
  console.error('💥 Error waiting for database:', error);
  process.exit(1);
});

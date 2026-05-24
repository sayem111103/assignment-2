import { Pool } from "pg";
import config from "../config";
export const pool = new Pool({
  connectionString: config.db_connection,
});

export const initDB = async () => {
  try {
    await pool.query(`
              CREATE TABLE IF NOT EXISTS users(
              id SERIAL PRIMARY KEY,
              name VARCHAR(100),
              email VARCHAR(100) UNIQUE NOT NULL,
              password TEXT NOT NULL,
              role VARCHAR(50) DEFAULT 'contributor',
      
              created_at TIMESTAMP DEFAULT NOW(),
              updated_at TIMESTAMP DEFAULT NOW()
              )
              `);
    await pool.query(`
              CREATE TABLE IF NOT EXISTS issues(
              id SERIAL PRIMARY KEY,
              title VARCHAR(150),
              description TEXT NOT NULL CHECK (LENGTH(description) >= 20),
              type VARCHAR(30) NOT NULL CHECK (type IN ('bug', 'feature_request')),
              status VARCHAR(30) DEFAULT 'open',
              reporter_id INTEGER NOT NULL,
      
              created_at TIMESTAMP DEFAULT NOW(),
              updated_at TIMESTAMP DEFAULT NOW()
              )
              `);
  } catch (error: unknown) {
    console.log(error);
  }
};

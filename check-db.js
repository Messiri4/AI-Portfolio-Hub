import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkDB() {
  const result = await pool.query('SELECT * FROM projects');
  console.log(JSON.stringify(result.rows, null, 2));
  await pool.end();
}

checkDB();
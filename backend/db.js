import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://postgres:szYXeKBrhGwNDWFNLrltMDHLjTZJokAq@ballast.proxy.rlwy.net:30436/railway', // ⬅️ à adapter
  ssl: { rejectUnauthorized: false }
});

export default pool;
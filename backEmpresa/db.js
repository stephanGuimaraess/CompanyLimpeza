const { Pool } = require('pg');

//config postgree
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'empresa',
  password: '86468540',
  port: 5432,
});


module.exports = pool;
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Render에서 설정한 DATABASE_URL 환경변수를 사용합니다.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Neon DB 접속 시 SSL 설정이 필요합니다.
  }
});

app.get('/', async (req, res) => {
  try {
    // 'test' 테이블에서 이름이 '홍길동'인 레코드 1개를 조회하는 쿼리
    const result = await pool.query("SELECT name FROM test LIMIT 1");
    
    if (result.rows.length > 0) {
      const userName = result.rows[0].name;
      res.send(`<h1>HELLO ${userName}</h1>`);
    } else {
      res.send('<h1>데이터를 찾을 수 없습니다.</h1>');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Database Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import promisePool from './utils/database.js';

(async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    console.log(rows);
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
})();

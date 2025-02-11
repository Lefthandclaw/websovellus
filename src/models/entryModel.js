import pool from '../utils/database.js';

export const getAllEntries = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM DiaryEntries');
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error('Database query failed');
  }
};

export const getEntryById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM DiaryEntries WHERE entry_id = ?', [id]);
    return rows[0];
  } catch (err) {
    console.error(err);
    throw new Error('Database query failed');
  }
};

export const createEntry = async (entry) => {
  const { user_id, entry_date, mood, weight, sleep_hours, notes } = entry;
  try {
    const sql = `
      INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [user_id, entry_date, mood, weight, sleep_hours, notes]);
    return { entry_id: result.insertId };
  } catch (err) {
    console.error(err);
    throw new Error('Database query failed');
  }
};

import promisePool from '../utils/database.js';

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    return rows;
  } catch (error) {
    console.error('Database query failed', error);
    return { error: 'Database query failed: ' + error.message };
  }
};

export { listAllEntries };
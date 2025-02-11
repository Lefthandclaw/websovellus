import { getAllEntries, getEntryById, createEntry } from '../models/entryModel.js';

export const getEntries = async (req, res) => {
  try {
    const entries = await getAllEntries();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEntry = async (req, res) => {
  try {
    const entry = await getEntryById(req.params.id);
    entry ? res.json(entry) : res.sendStatus(404);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addEntry = async (req, res) => {
  const { user_id, entry_date, mood, weight, sleep_hours, notes } = req.body;
  if (entry_date && user_id && (mood || weight || sleep_hours || notes)) {
    try {
      const result = await createEntry(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid input' });
  }
};

import promisePool from '../utils/database.js';

const testDatabaseConnection = async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT 1 + 1 AS result');
    res.json({ success: true, result: rows[0].result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { testDatabaseConnection };

import express from 'express';
import { getEntries, getEntry, addEntry } from '../controllers/entryController.js';
import { testDatabaseConnection } from '../controllers/entryController.js';

const router = express.Router();

router.get('/test-db', testDatabaseConnection);

router.route('/')
  .get(getEntries)
  .post(addEntry);

router.route('/:id')
  .get(getEntry);

export default router;


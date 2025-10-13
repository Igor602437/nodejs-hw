import { Router } from 'express';
// import { Note } from '../models/note.js';
import { getNoteById, getNotes } from '../controllers/notesController.js';

const router = Router();

router.get('/notes', getNotes);

router.get('/notes/:noteId', getNoteById);

router.get('/test-error', () => {
  throw new Error('Simulated server error');
});

export default router;

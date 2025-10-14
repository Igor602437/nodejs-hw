import { Router } from 'express';
import { getNoteById, getAllNotes } from '../controllers/notesController.js';

const router = Router();

router.get('/notes', getAllNotes);
router.get('/notes/:noteId', getNoteById);

export default router;

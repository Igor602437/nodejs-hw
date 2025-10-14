import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  // console.log('note: ', note);
  if (!note) {
    return res.status(404).json({ message: 'Student not found' });
    // next(createHttpError(404, 'Note not found'));
    // return;
  }
  res.status(200).json(note);
};

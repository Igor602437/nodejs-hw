import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import { connectMongoDB } from './db/connectMongoDB.js';
// import { Student } from './models/student.js';
import { Note } from './models/note.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });

// app.get('/notes/:noteId', (req, res) => {
//   const { noteId } = req.params;
//   res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
// });

app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
});

app.get('/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res.status(200).json(note);
});

// app.get('/students', async (req, res) => {
//   const students = await Student.find();
//   res.status(200).json(students);
// });

// app.get('/students/:studentId', async (req, res) => {
//   const { studentId } = req.params;
//   const student = await Student.findById(studentId);
//   if (!student) {
//     return res.status(404).json({ message: 'Student not found' });
//   }
//   res.status(200).json(student);
// });

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

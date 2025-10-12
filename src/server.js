import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { Student } from './models/student.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(express.json());
app.use(cors());

// app.use(
//   pino({
//     level: 'info',
//     transport: {
//       target: 'pino-pretty',
//       options: {
//         colorize: true,
//         translateTime: 'HH:MM:ss',
//         ignore: 'pid,hostname',
//         messageFormat:
//           '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
//         hideObject: true,
//       },
//     },
//   }),
// );

// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });

// app.get('/notes', (req, res) => {
//   res.status(200).json({ message: 'Retrieved all notes' });
// });

// app.get('/notes/:noteId', (req, res) => {
//   const { noteId } = req.params;
//   res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
// });

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
});

app.get('/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.status(200).json(student);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// app.use((err, req, res, next) => {
//   console.error(err);
//   const isProd = process.env.NODE_ENV === 'production';
//   res.status(500).json({
//     message: isProd
//       ? 'Something went wrong. Please try again later.'
//       : err.message,
//   });
// });
app.use((err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
});

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

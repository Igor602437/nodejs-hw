import { model, Schema } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    tag: {
      type: String,
      required: false,
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
      default: 'Todo',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
noteSchema.index(
  { title: 'text', content: 'text' },
  {
    name: 'NoteTextIndex',
    weights: { title: 5, content: 5 },
    default_language: 'english',
  },
);

export const Note = model('Note', noteSchema);

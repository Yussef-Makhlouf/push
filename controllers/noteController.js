import mongoose from 'mongoose';
import Note from '../models/Note.js';

// Create a new note
export const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = new Note({
      title,
      content,
    });

    const note = await newNote.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single note
export const getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ msg: 'Invalid ID' });
    }
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a note
export const updateNote = async (req, res) => {
  const { title, content } = req.body;
  const noteId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ msg: 'Invalid ID' });
  }

  const updatedNote = { title, content };

  try {
    const note = await Note.findByIdAndUpdate(
      noteId,
      { $set: updatedNote },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  const noteId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ msg: 'Invalid ID' });
  }

  try {
    const note = await Note.findByIdAndRemove(noteId);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

import express from "express";
import Note from "./models.js";
import mongoose from "mongoose";
import axios from "axios";

const router = express.Router();

// Create new notes: POST /
router.post("/", async (req, res) => {
  const { title, description, content, notebookId } = req.body;

  try {
    await axios.get(`http://reverse-proxy:8080/api/notebooks/${notebookId}`);
  } catch (error) {
    console.error("Error verifying notebookId:", error.message);
  }

  const note = new Note({ title, description, content, notebookId });

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  if (description && typeof description !== "string") {
    return res.status(400).json({ error: "Description must be a string" });
  }

  if (typeof title !== "string" || typeof content !== "string") {
    return res.status(400).json({ error: "Title and content must be strings" });
  }

  // check if note already exists with the same title
  const existingNote = await Note.findOne({ title });

  if (existingNote) {
    return res
      .status(409)
      .json({ error: "A note with this title already exists" });
  }

  try {
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all notes: GET /
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a note by ID: GET /:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Note id not found!" });
    }

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a note by ID: PUT /:id
router.put("/:id", async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const updatedData = { title, description, content };

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true },
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a note by ID: DELETE /:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

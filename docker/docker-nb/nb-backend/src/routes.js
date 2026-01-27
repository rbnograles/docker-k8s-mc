import express from "express";
import Notebook from "./models.js";
import mongoose from "mongoose";

const router = express.Router();

// Create new notebooks: POST /
router.post("/", async (req, res) => {
  const { title, description, content } = req.body;
  const notebook = new Notebook({ title, description, content });

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  if (description && typeof description !== "string") {
    return res.status(400).json({ error: "Description must be a string" });
  }

  if (typeof title !== "string" || typeof content !== "string") {
    return res.status(400).json({ error: "Title and content must be strings" });
  }

  // check if notebook already exists with the same title
  const existingNotebook = await Notebook.findOne({ title });

  if (existingNotebook) {
    return res
      .status(409)
      .json({ error: "A notebook with this title already exists" });
  }

  try {
    const savedNotebook = await notebook.save();
    res.status(201).json(savedNotebook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all notebooks: GET /
router.get("/", async (req, res) => {
  try {
    const notebooks = await Notebook.find();
    res.json(notebooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a notebook by ID: GET /:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notebook = await Notebook.findById(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Notebook id note found!" });
    }

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }
    res.json(notebook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a notebook by ID: PUT /:id
router.put("/:id", async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const updatedData = { title, description, content };

    const updatedNotebook = await Notebook.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true },
    );

    if (!updatedNotebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    res.json(updatedNotebook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a notebook by ID: DELETE /:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedNotebook = await Notebook.findByIdAndDelete(req.params.id);
    if (!deletedNotebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }
    res.json({ message: "Notebook deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

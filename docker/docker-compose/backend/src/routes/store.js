import express from "express";
import keyValueModel from "../models/keyValue.js";

const router = express.Router();

// Create a new entry for user-defined key-value pair
router.post("/", async (req, res) => {
  const { key } = req.body;
  try {
    const isExisting = await keyValueModel.findOne({ key });

    if (isExisting) {
      return res.status(400).send({ message: "Key already exists" });
    }

    const keyValue = new keyValueModel(req.body);
    await keyValue.save();

    res
      .status(201)
      .json({ message: "Key-Value pair stored successfully", keyValue });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Retrieve all key-value pairs
router.get("/", async (req, res) => {
  try {
    const keys = await keyValueModel.find({});
    res.status(200).send({ message: "Retrieve all key-value pairs", keys });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update key-value pair by key
router.put("/:key", async (req, res) => {
  try {
    const { key, value } = req.params;
    
    const updatedKeyValue = await keyValueModel.findOneAndUpdate(
      { key },
      { value },
      { new: true }
    );

    if (!updatedKeyValue) {
      return res.status(404).send({ message: "Key not found" });
    }

    res
      .status(200)
      .send({ message: "Key-Value pair updated successfully", updatedKeyValue });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete key-value pair by key
router.delete("/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const deletedKeyValue = await keyValueModel.findOneAndDelete({ key });

    if (!deletedKeyValue) {
      return res.status(404).send({ message: "Key not found" });
    }

    res
      .status(200)
      .send({ message: "Key-Value pair deleted successfully", deletedKeyValue });
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;

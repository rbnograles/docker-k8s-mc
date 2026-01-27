import express from "express";

const router = express.Router();

const users = [];

// Get all users
router.get("/", (req, res) => {
  return res.json({ users });
});

// Create a new user
router.post("/create", (req, res) => {
  const user = req.body;

  if (!user.userId) {
    return res.status(400).send({ message: "User ID is required" });
  }

  if (users.find((u) => u.userId === user.userId)) {
    return res.status(409).send({ message: "User already exists" });
  }

  users.push(user);
  res.status(201).send({ message: "User created", user });
});

export default router;

import express from "express";
import os, { hostname } from "os";

const app = express();
const port = 80;

app.get("/color", (req, res) => {
  const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  res.json({ color: randomColor, os: os.type(), hostname: hostname() });
});

app.listen(port, () => {
  console.log(`Color REST API is running at http://localhost:${port}`);
});

export default app;

// Push when ready

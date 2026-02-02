import express from "express";
import os, { hostname } from "os";

const app = express();
const port = 80;

const delayStartup = process.env.DELAY_STARTUP === "true";
const failLiveness = process.env.FAIL_LIVENESS === "true";
// Fail readiness randomly if the flag is set
const failReadiness =
  process.env.FAIL_READINESS === "true" ? Math.random() < 0.5 : false;

console.log(`Delay startup: ${delayStartup}`);
console.log(`Fail liveness: ${failLiveness}`);
console.log(`Fail readiness: ${failReadiness}`);

// Simulation: If DELAY_STARTUP is true, we "block" for 6 seconds
// (In a real app, this would be a heavy DB migration or cache warm-up)
if (delayStartup) {
  console.log("Startup delay initiated...");
  const start = Date.now();
  while (Date.now() - start < 6000) {
    // Synchronous block for demo purposes
  }
  console.log("Startup delay finished.");
}

app.get("/color", (req, res) => {
  const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  res.json({ color: randomColor, os: os.type(), hostname: hostname() });
});

// Readiness Probe: Controls if the pod receives traffic
app.get("/ready", (req, res) => {
  if (failReadiness) {
    return res.status(500).send("Not Ready");
  }
  res.status(200).send("Ready");
});

// Liveness Probe: Controls if the container should be restarted
app.get("/live", (req, res) => {
  if (failLiveness) {
    return res.status(500).send("Dead");
  }
  res.status(200).send("Alive");
});

app.listen(port, () => {
  console.log(`Color REST API is running at http://localhost:${port}`);
});

export default app;

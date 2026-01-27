import express from "express";
import cors from "cors";

import router from "./src/routes.js";

const server = express();
const port = 5000;
server.use(cors());
server.use(express.json({ limit: "50mb" }));

// centralized api call for all service methods
// POST GET PUT PATCH DELETE
// call -> /api/post/*
server.use("/api", router);

server.listen(port || process.env.port, () => {
    console.clear();
    console.log("Comment Service is running successfully!");
    console.log(`Listening at http://localhost:${port}`);
});

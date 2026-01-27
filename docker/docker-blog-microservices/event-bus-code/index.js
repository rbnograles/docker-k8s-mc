import express from "express";
import axios from "axios";
import cors from "cors";

const eventBus = express();
const port = 5005;
eventBus.use(cors());
eventBus.use(express.json({ limit: "50mb" }));

const events = [];

eventBus.post("/events", (req, res) => {
    const event = req.body;
    events.push(event);
    // COMMENT SERVICE
    axios.post("http://comments-srv:5000/api/events", event).catch((error) => {
        console.log(error.response);
    });
    // POST SERVICE
    axios
        .post("http://posts-clusterip-srv:5001/api/events", event)
        .catch((error) => {
            console.log(error.response);
        });
    // QUERY SERVICE
    axios.post("http://query-srv:5002/events", event).catch((error) => {
        console.log(error.response);
    });
    // MODERATION SERVICE
    axios.post("http://moderation-srv:5003/events", event).catch((error) => {
        console.log(error.response);
    });

    res.send({ status: "OK" });
});

eventBus.get("/events", (req, res) => {
    res.send(events);
});

eventBus.listen(port || process.env.port, () => {
    console.clear();
    console.log("Event Bus Service");
    console.log(`Listening to: http://event-bus-srv:${port}`);
});

import { Router } from "express";
import { randomBytes } from "crypto";

import axios from "axios";

export const router = Router();

const post = {};

router.get("/post", async (req, res) => {
    try {
        res.send(post);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/post/create", async (req, res) => {
    try {
        const id = randomBytes(4).toString("hex");
        const { title } = req.body;

        post[id] = { id, title };

        // emit event
        await axios.post("http://event-bus-srv:5005/events", {
            type: "PostCreated",
            data: {
                id,
                title,
            },
        });

        res.status(201).send(post[id]);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/events", (req, res) => {
    console.log("Received Event", req.body.type);

    res.send({});
});

export default router;

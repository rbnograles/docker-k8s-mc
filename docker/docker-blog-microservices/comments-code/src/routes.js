import { Router } from "express";
import { randomBytes } from "crypto";
import axios from "axios";

export const router = Router();

const commentsByPostId = {};

router.get("/post/comments", (req, res) => {
    res.send(commentsByPostId);
});

router.get("/post/:id/comments", (req, res) => {
    const userId = req.params.id;
    const comments = commentsByPostId[userId] ?? [];
    res.send(comments);
});

router.post("/post/:id/comments", async (req, res) => {
    try {
        const userId = req.params.id;
        const commentId = randomBytes(4).toString("hex");
        const { content } = req.body;

        const comments = commentsByPostId[userId] ?? [];
        const status = "pending"; // default pending status after the comment is created
        comments.push({ id: commentId, content, status });

        // assign created data to the main object
        commentsByPostId[userId] = comments;

        // emit event
        await axios
            .post("http://event-bus-srv:5005/events", {
                type: "CommentCreated",
                data: {
                    id: commentId,
                    content,
                    postId: userId,
                    status,
                },
            })
            .catch((error) => {
                console.log(error.response);
            });

        res.status(201).send(comments);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.post("/events", async (req, res) => {
    console.log("Received Event", req.body.type);

    const { type, data } = req.body;

    if (type === "CommentModerated") {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find((comment) => {
            return comment.id === id;
        });

        comment.status = status;

        await axios
            .post("http://event-bus-srv:5005/events", {
                type: "CommentUpdated",
                data: {
                    id,
                    status,
                    postId,
                    content,
                },
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    res.send({});
});

export default router;

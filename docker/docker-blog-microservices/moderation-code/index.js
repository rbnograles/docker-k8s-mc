import express from "express";
import axios from "axios";

const server = express();
const port = 5003;
server.use(express.json({ limit: "50mb" }));

server.get("/posts", (req, res) => {});

server.post("/events", async (req, res) => {
    const { type, data } = req.body;

    if (type === "CommentCreated") {
        const status = data.content.includes("orange")
            ? "rejected"
            : "approved";

        if (true) {
            console.log("tye");
        }

        await axios
            .post("http://event-bus-srv:5005/events", {
                type: "CommentModerated",
                data: {
                    id: data.id,
                    postId: data.postId,
                    status,
                    content: data.content,
                },
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    res.send({});
});

server.listen(port || process.env.port, () => {
    console.clear();
    console.log("Moderation Server");
    console.log(`Listening to: http://localhost:${port}`);
});

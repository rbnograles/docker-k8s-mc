import React, { useState } from "react";

import { createComment } from "../services/comment";

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState("");

    const onSubmit = async (e) => {
        // prevent default submission of form and page reload
        e.preventDefault();
        try {
            await createComment({ content }, postId);
            setContent("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mx-2">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary mt-2 mb-2">Submit</button>
            </form>
        </div>
    );
};

export default CommentCreate;

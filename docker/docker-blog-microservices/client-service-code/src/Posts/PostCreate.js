import React, { useState } from "react";

import { createPost } from "../services/post";

const PostCreate = () => {
    const [title, setTitle] = useState("");

    const onSubmit = async (e) => {
        // prevent default submission of form and page reload
        e.preventDefault();
        try {
            await createPost({ title });
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group mb-2">
                    <label>Title</label>
                    <input
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default PostCreate;

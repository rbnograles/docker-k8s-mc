import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchPost } from "../services/post";

import CommentCreate from "../Commets/CommentCreate";
import CommentList from "../Commets/CommentList";

const PostList = () => {
    const [posts, setPosts] = useState({});

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        // fetch posts
        (async (cancelToken) => {
            try {
                const data = await fetchPost(cancelToken);
                setPosts(data.data);
            } catch (error) {
                setPosts({});
                console.log(error);
            }
        })();
        // clean up api request
        return () => {
            cancelToken.cancel();
        };
    }, []);

    const renderPosts = Object.values(posts).map((post, i) => {
        return (
            <div
                key={i}
                className="card"
                style={{ width: "30%", marginBottom: "20px" }}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                </div>
                <CommentList comments={post.comments} />
                <CommentCreate postId={post.id} />
            </div>
        );
    });

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderPosts}
        </div>
    );
};

export default PostList;

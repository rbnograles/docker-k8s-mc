import React from "react";

// components
import PostCreate from "./Posts/PostCreate";
import PostList from "./Posts/PostList";

const App = () => {
    return (
        <div className="container">
            <h1>Create Post</h1>
            <PostCreate />
            <hr />
            <h1>Post List</h1>
            <PostList />
        </div>
    );
};

export default App;

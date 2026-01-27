import React from "react";

const CommentList = ({ comments }) => {
    const renderComments = comments.map((comment, i) => {
        let content;

        if (comment.status === "approved") {
            content = comment.content;
        }

        if (comment.status === "pending") {
            content = "This comment is awaiting moderation";
        }

        if (comment.status === "rejected") {
            content = "This comment has been rejected";
        }

        return (
            <ul key={i}>
                <li>{content}</li>
            </ul>
        );
    });

    return <div>{renderComments}</div>;
};

export default CommentList;

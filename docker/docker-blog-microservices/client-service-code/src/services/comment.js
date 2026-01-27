import axios from "axios";
import { mcsPostServiceBaseURL } from "./baseUrl";

export const createComment = async (body, postId) => {
    return await axios.post(
        `${mcsPostServiceBaseURL}/api/post/${postId}/comments`,
        body
    );
};

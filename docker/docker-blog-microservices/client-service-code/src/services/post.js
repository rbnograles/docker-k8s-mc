import axios from "axios";
import { mcsPostServiceBaseURL } from "./baseUrl";

export const createPost = async (body) => {
    return await axios.post(`${mcsPostServiceBaseURL}/api/post/create`, body);
};

export const fetchPost = async (cancelToken) => {
    return await axios.get(`${mcsPostServiceBaseURL}/posts`, {
        signal: cancelToken,
    });
};

import axios from "axios";
import { BASE_URL } from "../../config.js";

export const createNewComment = async ({ token, desc, slug, parent, replyOnUser }) => {
    try {
         const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        }
        const {data} = await axios.post(`${BASE_URL}/api/comments/`, {
            desc, 
            slug, 
            parent, 
            replyOnUser
        }, config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
        throw new Error(error.response.data.message)
      throw new Error(error.message);
    }
}

export const createUpdateComment = async ({ token, desc, commentId }) => {
    try {
         const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        }
        const {data} = await axios.put(`${BASE_URL}/api/comments/${commentId}`, {
           desc, 
           commentId
        }, config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
        throw new Error(error.response.data.message)
      throw new Error(error.message);
    }
}


export const deleteComment = async ({ token, commentId }) => {
    try {
         const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        }
        const {data} = await axios.delete(`${BASE_URL}/api/comments/${commentId}`, config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
        throw new Error(error.response.data.message)
      throw new Error(error.message);
    }
}

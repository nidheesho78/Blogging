import axios from 'axios';
import { BASE_URL } from '../../config';

export const signup = async ({name, email, mobile, password}) => {
    try {
        const {data} = await axios.post(`${BASE_URL}/api/users/register`, {
            name,
            email,
            mobile,
            password
        });
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
        throw new Error(error.response.data.message)
      throw new Error(error.message);
    }
}

export const login = async ({email, password}) => {
    try {
        const {data} = await axios.post(`${BASE_URL}/api/users/login`, {
            email,
            password
        });
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
        throw new Error(error.response.data.message)
      throw new Error(error.message);
    }
}

export const getUserProfile = async ({token}) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        }
        const {data} = await axios.get(`${BASE_URL}/api/users/profile`, config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
        throw new Error(error.response.data.message)
      throw new Error(error.message);
    }
}

export const updateProfile = async ({token, userData}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        }
        const {data} = await axios.put(`${BASE_URL}/api/users/updateProfile`, userData, config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
        throw new Error(error.response.data.message)
      throw new Error(error.message);
    }
}



export const updateProfilePicture = async ({token, formData}) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`, 
            },
        }
        const {data} = await axios.put(`${BASE_URL}/api/users/updateProfilePicture`, formData, config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
        throw new Error(error.response.data.message)
      throw new Error(error.message);
    }
}
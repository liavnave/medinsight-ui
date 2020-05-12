import axios from 'axios';

const beautifyPosts = (posts) => {
    posts.forEach((post) => {
        post.date_published = new Date(post.date_published).toDateString();
    });
};

const baseUrl = window.location.origin;

const addPost = async (data) => {
    data.parent_post_id = null;
    return await axios.post(`${baseUrl}/api/v1/posts`, data);
};

const getLatestPosts = async () => {
    const response = await axios.get(`${baseUrl}/api/v1/posts?limit=10`);
    beautifyPosts(response.data);
    return response;
};

const getPosts = async () => {
    const response = await axios.get(`${baseUrl}/api/v1/posts`);
    beautifyPosts(response.data);
    return response;
};

const getPostsBySearch = async (search) => {
    const response = await axios.post(`${baseUrl}/api/v1/search`, {
        text: search
    });
    beautifyPosts(response.data);
    return response;
};

const getComments = async (postId) => {
    const response = await axios.get(`${baseUrl}/api/v1/posts?parent_id=${postId}`);
    beautifyPosts(response.data);
    return response;
};

const getTags = async (postId) => {
    return await axios.get(`${baseUrl}/api/v1/tags?post_id=${postId}`);
};

export default {
    addPost,
    getLatestPosts,
    getPosts,
    getPostsBySearch,
    getComments,
    getTags
};

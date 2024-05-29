import axios from 'axios';

export const getPosts = params => {
  return axios.get('http://localhost:5000/posts', { params });
};

export const getPostById = id => {
  return axios.get(`http://localhost:5000/posts/${id}`);
};

export const createPost = data => {
  return axios.post('http://localhost:5000/posts', data);
};

export const updatePost = (id, data) => {
  return axios.put(`http://localhost:5000/posts/${id}`, data);
};

export const deletePost = id => {
  return axios.delete(`http://localhost:5000/posts/${id}`);
};

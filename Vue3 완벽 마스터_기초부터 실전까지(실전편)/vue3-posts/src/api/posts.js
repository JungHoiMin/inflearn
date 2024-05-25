import axios from 'axios';

export const getPosts = async () => {
  try {
    const response = await axios.get('/mocks/posts.json');
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

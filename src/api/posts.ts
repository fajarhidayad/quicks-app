import { API_ID, BASE_URL } from './base';
import axios from 'axios';

interface Post {
  id: string;
  owner: {
    firstName: string;
    lastName: string;
    title: string;
  };
  publishDate: Date;
  text: string;
}

type ResponseType<T> = {
  data: T;
  total: number;
  page: number;
  limit: number;
};

export const getPosts = async ({ limit }: { limit: number }) => {
  try {
    const response = await axios.get<ResponseType<Post[]>>(
      `${BASE_URL}/post?limit=${limit}`,
      {
        headers: { 'app-id': API_ID },
      }
    );
    const data = response.data;

    return data;
  } catch (error) {
    console.error(error);
  }
};

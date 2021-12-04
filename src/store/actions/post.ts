import { CreatePostType } from '../../types.d';
import {
  COMMENT_ON_POST,
  CREATE_POST,
  DELETE_POST,
  LIKE_A_POST,
  READ_ONE_POST,
  READ_POSTS,
} from './types';

export const getPosts = (params = '') => {
  const url = `posts${params}`;
  return {
    type: READ_POSTS,
    url,
    api: (apiClient: any) => apiClient.get(url),
  };
};

export const getAPost = (id: string) => {
  const url = `posts/${id}`;
  return {
    type: READ_ONE_POST,
    url,
    api: (apiClient: any) => apiClient.get(url),
  };
};

export const createPost = (formData: CreatePostType) => {
  const url = 'posts';
  return {
    type: CREATE_POST,
    url,
    api: (apiClient: any) => apiClient.post(url, formData),
  };
};

export const commentOnPost = (id: string, formData: { comment: string }) => {
  const url = `posts/comment/${id}`;
  return {
    type: COMMENT_ON_POST,
    url,
    api: (apiClient: any) => apiClient.post(url, formData),
  };
};

export const likeAPost = (id: string) => {
  const url = `posts/like/${id}`;
  return {
    type: LIKE_A_POST,
    url,
    api: (apiClient: any) => apiClient.post(url),
  };
};

export const deletePost = (id: string) => {
  const url = `posts/${id}`;
  return {
    type: DELETE_POST,
    url,
    api: (apiClient: any) => apiClient.delete(url),
  };
};

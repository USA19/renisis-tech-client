import server from "../BaseApi/server";
import { Post, FetchAllPostsResponseInterface } from "../../Interface";

import { AxiosResponse } from "axios";

export const getPosts = (page = "1", limit = "10"): Promise<AxiosResponse<FetchAllPostsResponseInterface>> => {
  return server.get(`/getPosts?page=${page}&&limit=${limit}`);
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await server.get(`/getPost/${id}`);
  return response.data;
};

export const createPost = (data: FormData): Promise<AxiosResponse<Post>> => {
  return server.post("/uploadPost", data);
};

export const updatePost = async (id: string, data: FormData): Promise<AxiosResponse<Post>> => {
  return await server.put(`/editPost/${id}`, data);
};

export const removePost = (id: string): Promise<AxiosResponse> => {
  return server.delete(`/deletePost/${id}`);
};

export const addCommentToPostApi = async (id: string, comment: string): Promise<AxiosResponse<Post>> => {
  return server.post(`/addCommentToPost/${id}`, {
    comment,
  });
};

export const likeOrUnlikePostApi = async (id: string): Promise<AxiosResponse<Post>> => {
  return server.post(`/likePost/${id}`, {});
}

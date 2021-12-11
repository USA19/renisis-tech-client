import { FC, useState, useContext, createContext, SetStateAction } from "react";
import { AxiosResponse } from "axios";

import { AuthContext } from "../AuthContext/AuthContext";
import {
  getPosts, getPost, createPost, removePost, addCommentToPostApi, updatePost, likeOrUnlikePostApi
} from "./Api";
import { Post, PostContextInterface, FetchAllPostsResponseInterface, ProviderInterface } from "../../Interface";
import Alert from "../../Components/Alert";
import { CHECK_INTERNET_CONNECTION } from "../../Constants";

export const PostContext = createContext<PostContextInterface>({
  posts: [],
  singlePost: null,
  totalPostPages: 1,
  CreatePost: (data: FormData) => { },
  deletePost: (id: string) => { },
  editPost: (id: string, data: FormData) => { },
  fetchPosts: (page: string, limit: string) => { },
  fetchPost: (id: string) => { },
  setSinglePost: (value: SetStateAction<Post | null>) => { },
  addCommentToPost: (postId: string, comment: string) => { },
  likeOrUnlikePost: (id: string) => { }
});

export const PostProvider: FC = (props: ProviderInterface): JSX.Element => {
  const { setLoading } = useContext(AuthContext);
  const { children } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const [singlePost, setSinglePost] = useState<Post | null>(null);
  const [totalPostPages, setTotalPostPages] = useState<number>(1);

  const fetchPosts = async (page = "1", limit = "10") => {
    try {
      setLoading(true)
      const result: AxiosResponse<FetchAllPostsResponseInterface> = await getPosts(page, limit);
      const { data: { posts, count } } = result;
      setPosts(posts);
      setTotalPostPages(count);
      setLoading(false)
    } catch (e) {
      setLoading(false)
      Alert.error(CHECK_INTERNET_CONNECTION)
    }
  };

  const fetchPost = async (id: string) => {
    try {
      setLoading(true);
      const result = await getPost(id);
      setSinglePost(result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.error(CHECK_INTERNET_CONNECTION)
    }
  };

  const CreatePost = async (data: FormData) => {
    try {
      setLoading(true);
      const res: AxiosResponse<Post> = await createPost(data);
      const list = [res.data, ...posts];
      setPosts(list);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.error(CHECK_INTERNET_CONNECTION)
    }
  };

  const deletePost = async (id: string) => {
    try {
      setLoading(true);
      await removePost(id);
      const list = posts.filter((post) => post._id !== id);
      setPosts(list);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.error(CHECK_INTERNET_CONNECTION)
    }
  };

  const editPost = async (id: string, data: FormData) => {
    try {
      setLoading(true);
      const res = await updatePost(id, data);
      let list: Post[] = [];

      for (let post of posts) {
        if (post._id === id) {
          list.push(res.data);
        } else {
          list.push(post);
        }
      }

      setPosts(list);
      setSinglePost(null);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.error(CHECK_INTERNET_CONNECTION)
    }
  };

  const addCommentToPost = async (postId: string, comment: string) => {
    try {
      setLoading(true);
      const res = await addCommentToPostApi(postId, comment);

      let list: Post[] = [];
      for (let item of posts) {
        if (item._id === postId) {
          list.push(res.data);
        } else {
          list.push(item);
        }
      }

      setPosts([...list]);
      setLoading(false);
    } catch (e) {
      Alert.error(CHECK_INTERNET_CONNECTION)
    }
  };

  const likeOrUnlikePost = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await likeOrUnlikePostApi(id);
      let list: Post[] = [];

      for (let post of posts) {
        if (post._id === id) {
          list.push(data);
        } else {
          list.push(post);
        }
      }

      setPosts(list);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.error(CHECK_INTERNET_CONNECTION)
    }
  };

  return (
    <PostContext.Provider
      value={{
        totalPostPages,
        posts,
        singlePost,
        CreatePost,
        deletePost,
        editPost,
        fetchPosts,
        fetchPost,
        setSinglePost,
        addCommentToPost,
        likeOrUnlikePost
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

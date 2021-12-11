import { Dispatch, ReactNode, SetStateAction } from "react";

export interface User {
  _id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  password: string,
  email: string,
  resetToken?: string,
  resetTokenExpiration?: Date,
  profileImageUrl: string,
  createdAt: string
  updatedAt: string
}

export interface UserRegisterInputType {
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  password: string,
  email: string,
}

export interface LikeInterface {
  likedBy: User
}

export interface comment {
  comment: string,
  commentedBy: User,
  date: Date
}

export interface Post {
  _id: string,
  postedBy: User,
  description: string,
  imageUrl: string,
  likes: LikeInterface[],
  comments: comment[]
  createdAt: string,
  updatedAt: string,
}

export interface PostContextInterface {
  posts: Post[];
  singlePost: Post | null;
  totalPostPages: number;
  CreatePost: (data: FormData) => void;
  deletePost: (id: string) => void;
  editPost: (id: string, data: FormData) => void;
  fetchPosts: (page: string, limit: string) => void;
  fetchPost: (id: string) => void;
  setSinglePost: (value: React.SetStateAction<Post | null>) => void;
  addCommentToPost: (postId: string, comment: string) => void;
  likeOrUnlikePost: (id: string) => void
}

export interface CommentListPropType {
  Comments: comment[];
  postId: string;
}

export interface SingleCommentPropType {
  comment: comment
}


export interface ProviderInterface {
  children?: ReactNode;
}


export interface LoginInputType {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User
  token: string;
}

type Key = string | number | undefined;

export interface CloseSnackbarProps {
  id: Key;
}

export interface AuthContextInterface {
  isSignedIn: boolean;
  user: User | null;
  loading: boolean;
  handleSignout: () => void;
  setLoading: (value: SetStateAction<boolean>) => void;
  getLoggedInUser: () => void;
  updateUser: (data: FormData) => void;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>
}

export interface layoutPropsType {
  children: ReactNode;
}

export interface FetchAllPostsResponseInterface {
  posts: Post[];
  count: number;
}

export interface PostCommentTextfieldProps {
  postId: string
};

export interface PostCardPropsType {
  posts: Post[];
}

export interface SinglePostPropsType {
  post: Post;
}

export interface CreatePostProps {
  open: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export interface PreviewMediaProps {
  url: File | null;
  setUrl: Dispatch<SetStateAction<File | null>>;
}

export interface PreviewEditPostProps extends PreviewMediaProps {
  imageUrl: string
}

export interface BasicPaginationProp {
  setPage: Dispatch<SetStateAction<number>>;
  setLoaded?: Dispatch<SetStateAction<boolean>>
}
import { FC } from "react";

import { PostCardPropsType } from "../../../Interface";
import ShowSinglePost from "./ShowSinglePost";

const PostCard: FC<PostCardPropsType> = ({ posts }): JSX.Element => {

  return (
    <>
      {posts.map((post, i) => (<ShowSinglePost post={post} key={i} />))}
    </>
  );
}

export default PostCard;
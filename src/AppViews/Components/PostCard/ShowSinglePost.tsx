import { FC, useContext, useState } from "react";
import { PostContext } from "../../../Context/PostContext/PostContext";
import PostCommentTextfield from "../Comments/CommentTexField";
import Comments from "../Comments/CommentList";
import EditPost from "../../EditPost/EditPost";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { AuthContext } from "../../../Context/AuthContext/AuthContext";

import { SinglePostPropsType, Post } from "../../../Interface";
import { baseUrl } from "../../../Context/BaseApi/server";
import { returnLike } from "../../../Utils";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginBottom: "30px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  span: {
    fontSize: 12,
    paddingLeft: 5,
  }
}));

const ShowSinglePost: FC<SinglePostPropsType> = ({ post }): JSX.Element => {
  const { deletePost, setSinglePost, likeOrUnlikePost } = useContext(PostContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = (post: Post) => {
    setSinglePost(post);
    setOpen(true);
    handleClose();
  };
  const handleDelete = (id: string) => {
    deletePost(id);
    handleClose();
    console.log(id);
  };

  const handleHitLikeButton = () => {
    likeOrUnlikePost(post._id)
  }

  const { user } = useContext(AuthContext);
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              src={
                post.postedBy && post.postedBy.profileImageUrl
                  ? `${baseUrl}${post.postedBy.profileImageUrl}`
                  : "/ssa"
              }
            />
          }
          action={
            user &&
            post &&
            post.postedBy &&
            user._id === post.postedBy._id && (
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={`${post.postedBy.email}`}
          subheader={post.createdAt && new Date(post.createdAt).toDateString()}
        />

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleEdit(post)}>Edit</MenuItem>
          <MenuItem onClick={() => handleDelete(post._id)}>Delete</MenuItem>
        </Menu>

        {post.imageUrl && (
          <CardMedia
            className={classes.media}
            image={baseUrl + post.imageUrl}
            title={post.description}
          />
        )}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleHitLikeButton}>
            {returnLike(user?._id || "", post.likes) ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon color="secondary" />}
            <span className={classes.span}>{post.likes.length > 0 && post.likes.length}</span>
          </IconButton>
          <IconButton aria-label="Comment" onClick={handleExpandClick}>
            <CommentIcon />
            <span className={classes.span}>{post.comments.length > 0 && post.comments.length}</span>
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Comments postId={post._id} Comments={post.comments} />
          <PostCommentTextfield postId={post._id} />
        </Collapse>
      </Card>
      <EditPost open={open} setOpen={setOpen} />
    </>
  );
}

export default ShowSinglePost;

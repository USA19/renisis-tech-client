import { useState, useContext, FC } from "react";
import { withStyles, fade } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { PostContext } from "../../../Context/PostContext/PostContext";
import { baseUrl } from "../../../Context/BaseApi/server";
import { PostCommentTextfieldProps } from "../../../Interface";

export const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    // width: "auto",
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginBottom: "10px",
  },
  avatar: {
    backgroundColor: "blue",
  },
  commentBar: { position: "relative", width: "100%" },
  sendButton: {
    position: "absolute",
    right: 0,
    top: "-4px",
  },
}));

const PostCommentTextfield: FC<PostCommentTextfieldProps> = ({ postId }): JSX.Element => {
  const classes = useStyles();
  const { addCommentToPost } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState<string>("");

  const handleComment = () => {
    if (comment) {
      addCommentToPost(postId, comment);
      setComment("");
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={2} md={1}>
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={
              user && user.profileImageUrl
                ? baseUrl + user.profileImageUrl
                : "/ssa"
            }
          />
        </Grid>
        <Grid item xs={10} md={11}>
          <Box className={classes.commentBar}>
            <BootstrapInput
              placeholder="Add a Comment"
              style={{ width: "100%" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <IconButton
              color="primary"
              className={classes.sendButton}
              onClick={handleComment}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostCommentTextfield;

import { FC, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import { SingleCommentPropType } from "../../../Interface";
import Typography from "@material-ui/core/Typography";
import { baseUrl } from "../../../Context/BaseApi/server";
import { toTitleCase } from "../../../Utils";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
}));

const SingleComment: FC<SingleCommentPropType> = ({ comment }): JSX.Element => {
  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start" button>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp"
          src={comment && comment.commentedBy && comment.commentedBy.profileImageUrl
            ? baseUrl + comment.commentedBy.profileImageUrl
            : "/ssa"
          }
        />
      </ListItemAvatar>
      <ListItemText
        primary={comment && comment.commentedBy ? toTitleCase(`${comment.commentedBy.firstName} ${comment.commentedBy.lastName}`) : ""}
        secondary={
          <Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {comment.comment}
            </Typography>
          </Fragment>
        }
      />
    </ListItem>
  );
};

export default SingleComment;

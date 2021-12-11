import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import { CommentListPropType } from "../../../Interface";
import SingleComment from "./SingleComment"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const CommentList: FC<CommentListPropType> = ({ Comments }): JSX.Element => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {Comments.map(comment => <SingleComment comment={comment} />)}
    </List>
  );
};

export default CommentList;

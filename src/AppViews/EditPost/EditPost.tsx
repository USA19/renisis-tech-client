import { FC, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { PostContext } from "../../Context/PostContext/PostContext";
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import PreviewMedia from "./Components/PreviewPost";
import { CreatePostProps } from "../../Interface";
const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
const useStyles = makeStyles({
  dialogPaper: {
    width: "80%",
    height: "60%",
  },
  description: {
    width: "100%",
    height: "100%",
    // "&::placeholder": {
    fontSize: "2em",

    // },
  },
  addMedia: {
    position: "absolute",
    bottom: "0",
    width: "100%",
  },
  absolute: {
    position: "absolute",
    bottom: "60px",
    right: "16px",
    zIndex: 1000,
  },
  input: {
    display: "none",
    position: "absolute",
    bottom: "60px",
    right: "16px",
  },
  avatar: {
    backgroundColor: "blue",
  },
});

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const EditPost: FC<CreatePostProps> = ({ open, setOpen }): JSX.Element => {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const { singlePost, editPost } = useContext(PostContext);
  const [media, setMedia] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (singlePost) {
      setDescription(singlePost.description);
    }
  }, [singlePost]);

  const handleClose = () => {
    setOpen(false);
    setMedia(null);
    setDescription("");
  };

  const handleEditPost = () => {
    if (description.length >= 3 || media) {
      const data = new FormData();
      data.append("description", description);
      media && data.append("image", media);

      if (singlePost) {
        editPost(singlePost._id, data);
      }

      handleClose();
    }
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleMedia = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = event.target.files;
    fileList && setMedia(fileList[0]);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          What is on your mind?
        </DialogTitle>
        <DialogContent dividers style={{ position: "relative" }}>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={2} md={1}>
              <Avatar src="/portal.jpeg" className={classes.avatar} />
            </Grid>

            <Grid item xs={8} sm={10} md={11}>
              <Typography variant="body2" style={{ marginTop: "10px" }}>
                {context.user && context.user.email}
              </Typography>
            </Grid>
          </Grid>
          <Box>
            <InputBase
              className={classes.description}
              placeholder="What's in your mind?"
              inputProps={{ "aria-label": "naked" }}
              fullWidth
              value={description}
              onChange={handleDescriptionChange}
              multiline
            />
          </Box>
          <Box className={classes.absolute}>
            <input
              className={classes.input}
              id="contained-button-file"
              accept=".png, .jpg, .jpeg"
              multiple
              type="file"
              name="image"
              onChange={(e) => handleMedia(e)}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
              >
                <AddIcon />
              </Button>
            </label>
          </Box>
          <PreviewMedia
            url={media}
            setUrl={setMedia}
            imageUrl={singlePost?.imageUrl || ""}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleEditPost}
            color="primary"
            variant="contained"
          >
            update Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPost;

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    position: "relative",
    margin: theme.spacing(1),
    width: theme.spacing(20),
    height: theme.spacing(20),
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    }
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  row: {
    display: "flex",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none",
  },
  close: {

  },
  overflow_visible: {
    overflow: 'visible !important'
  }
}));

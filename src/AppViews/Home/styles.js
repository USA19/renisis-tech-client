import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: "30%",
    // left: "20%",
    width: "100%",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "column",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  input: {
    display: "none",
  },
  title: {
    fontWeight: "bold",
  },
}));

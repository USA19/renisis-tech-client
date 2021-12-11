import { FC, useContext } from "react";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

import { AuthContext } from "../Context";

const useStyles = makeStyles({
  zIndex: {
    zIndex: 99999
  }
})
const Loader: FC = (): JSX.Element => {
  const classes = useStyles()
  const { loading } = useContext(AuthContext);

  return (
    <Backdrop open={loading} className={classes.zIndex}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loader;
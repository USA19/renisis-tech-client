import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { PreviewMediaProps } from "../../../Interface";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "10px",
    position: "relative",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

const PreviewMedia: FC<PreviewMediaProps> = ({ url, setUrl }): JSX.Element => {
  const classes = useStyles();

  const handleDeleteImage = () => {
    setUrl(null);
  };
  return (
    <Box>
      {url &&
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={URL.createObjectURL(url)}
          />
          <IconButton
            onClick={handleDeleteImage}
            className={classes.close}
          >
            <HighlightOffIcon />
          </IconButton>
        </Card>
      }
    </Box>
  );
};

export default PreviewMedia;

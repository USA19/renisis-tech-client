import { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { baseUrl } from "../../../Context/BaseApi/server";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { PreviewEditPostProps } from "../../../Interface";

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

const PreviewPost: FC<PreviewEditPostProps> = ({ url, setUrl, imageUrl }): JSX.Element => {
  const classes = useStyles();


  const handleDeleteImage = () => {
    setUrl(null)
  }

  return (
    <Box>
      {imageUrl && (
        <Box>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={url ? URL.createObjectURL(url) : `${baseUrl}${imageUrl}`}
            />
            {url && <IconButton
              onClick={handleDeleteImage}
              className={classes.close}
            >
              <HighlightOffIcon />
            </IconButton>}
          </Card>
        </Box>
      )}
    </Box>
  );
};
export default PreviewPost;

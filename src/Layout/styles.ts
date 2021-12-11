import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { BLACK } from "../theme";

export const useNavbarStyles = makeStyles((theme) => ({
  heading: {
    textDecoration: 'none',
    fontSize: 24,
    color: BLACK,
    fontWeight: 'bold',
    cursor: 'pointer',
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },

  userStatus: {
    borderBottom: `1px solid ${grey[300]}`,
    "& .MuiTypography-body1": {
      lineHeight: "20px"
    },

    "& .MuiTypography-subtitle1": {
      fontWeight: "bold",
    }
  },

  textDecorationNone: {
    textDecoration: 'none',
    color: 'black'
  }
}));

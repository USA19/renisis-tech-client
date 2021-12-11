import { Typography } from "@material-ui/core";
import { TOKEN } from "../Constants";
import { LikeInterface } from "../Interface";

export const toTitleCase = (toTransform: string): string => {
  return toTransform.replace(/\b([a-z])/g, function (_, initial) {
    return initial.toUpperCase();
  });
};

export const getToken = () => {
  return window.localStorage.getItem(TOKEN);
};

export const setToken = (token: string) => {
  return window.localStorage.setItem(TOKEN, token);
};

export const removeToken = () => {
  return window.localStorage.removeItem(TOKEN);
};

export const renderItem = (name: string, value: string) => (
  <>
    <Typography variant="subtitle1" color="secondary">{name}</Typography>
    <Typography variant="h6">
      {value}
    </Typography>
  </>
);

export const formatDate = (date: Date | string) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export const returnLike = (userId: string, likesArray: LikeInterface[]) => {
  let liked = false;
  if (likesArray.length !== 0) {
    for (let likedUser of likesArray) {
      if (likedUser.likedBy._id.toString() === userId.toString()) {
        liked = true;
        break;
      }
    }
  }
  return liked;
};
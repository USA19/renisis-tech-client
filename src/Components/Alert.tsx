//packages block
import { FC } from "react";
import { useSnackbar, VariantType, WithSnackbarProps } from "notistack";
import { Close as CloseIcon } from "@material-ui/icons"
import { IconButton } from "@material-ui/core";
//interface block
import { CloseSnackbarProps } from "../Interface";

let useSnackbarRef: WithSnackbarProps;

export const SnackbarUtilsConfiguration: FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const CloseButton: FC<CloseSnackbarProps> = ({ id }) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton
      aria-label="Close notification"
      color="inherit"
      size="small"
      onClick={() => closeSnackbar(id)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

const Alert = {
  success(msg: string) {
    this.toast(msg, "success");
  },
  warning(msg: string) {
    this.toast(msg, "warning");
  },
  info(msg: string) {
    this.toast(msg, "info");
  },
  error(msg: string) {
    this.toast(msg, "error");
  },
  toast(msg: string, variant: VariantType = "default") {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  },
};

export default Alert;
import * as yup from "yup";
import { RequiredMessage } from "../../Constants";

export const initialValues = {
  email: "",
  password: "",
};

export let validationSchema = yup.object({
  email: yup.string().email().required(RequiredMessage("Email")),
  password: yup.string().required(RequiredMessage("Password")),
});

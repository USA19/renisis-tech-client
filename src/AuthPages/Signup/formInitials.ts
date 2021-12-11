import * as yup from "yup";
import { ALPHABETS_REGEX, PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE, RequiredMessage, ValidMessage } from "../../Constants";

export let validationSchema = yup.object({
  firstName: yup
    .string()
    .matches(ALPHABETS_REGEX, ValidMessage("firstName"))
    .min(3)
    .required(RequiredMessage("FirstName")),
  lastName: yup
    .string()
    .matches(ALPHABETS_REGEX, ValidMessage("lastName"))
    .min(3)
    .required(RequiredMessage("LastName")),
  dateOfBirth: yup.date().required(RequiredMessage("Date of birth")),
  email: yup.string().email().required(RequiredMessage("email")),

  password: yup
    .string()
    .required(RequiredMessage("Password"))
    .matches(
      PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE),
  Repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("confirm your password"),
});

export const initialValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  password: "",
  Repassword: "",
};

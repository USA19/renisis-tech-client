import * as yup from "yup";
import { User } from "../../Interface";
import { ALPHABETS_REGEX, RequiredMessage, ValidMessage } from "../../Constants";
import { formatDate } from "../../Utils";

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
});

export const initialValues = (user: User | null) => {
  return {
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    dateOfBirth: user ? formatDate(user.dateOfBirth) : "",
    email: user ? user.email : "",
  };
};


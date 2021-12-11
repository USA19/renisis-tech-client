//constants
export const TOKEN = 'RENEIS_APP_TOKEN';
export const CHECK_INTERNET_CONNECTION = "Something went wrong!";
export const LOGOUT = "Logout";
export const PROFILE = "My Profile"
//routes
export const LOGIN_ROUTE = "/";
export const ROUTE_ROUTE = "/";
export const SIGNUP_ROUTE = "/signup";
export const PROFILE_ROUTE = "/myProfile"
// regex
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
export const ALPHABETS_REGEX = /^[A-Za-z ]*$/
//messages
export const PASSWORD_VALIDATION_MESSAGE = "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character";
export const ValidMessage = (fieldName: string) => `Please enter valid ${fieldName}`;
export const RequiredMessage = (fieldName: string) => `${fieldName} is required`;
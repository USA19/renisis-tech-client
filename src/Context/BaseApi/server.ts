import axios from "axios";
import Alert from "../../Components/Alert";
import { getToken } from "../../Utils";

export const baseUrl = "https://renisis-tech.herokuapp.com/";

const server = axios.create({
  baseURL: baseUrl,
});

server.interceptors.request.use(
  (config) => {
    const jwtToken = getToken();
    config.headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    return config;
  },
  ({ message }) => {
    Alert.error(message)
  }
);

export default server;

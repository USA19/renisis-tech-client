import server from "../BaseApi/server";
import { LoginResponse, User, LoginInputType, UserRegisterInputType } from "../../Interface";
import { AxiosResponse } from "axios";
import { setToken } from "../../Utils";

export const signupApi = async (data: UserRegisterInputType): Promise<AxiosResponse<LoginResponse>> => {
  return await server.post("/signup", data);
};

export const loginApi = async (data: LoginInputType): Promise<User> => {
  const response: AxiosResponse<LoginResponse> = await server.post("/login", data);
  setToken(response.data.token);
  return response.data.user;
};

export const loggedInUserApi = async (): Promise<User> => {
  const response: AxiosResponse<LoginResponse> = await server.get("/loggedInUser");
  return response.data.user;
};



export const editUser = (id: string, data: FormData): Promise<AxiosResponse<User>> => {
  return server.put(`/editUserProfile/${id}`, data);
};
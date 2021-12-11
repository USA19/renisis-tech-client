import { FC, useState, createContext, SetStateAction } from "react";

import { loggedInUserApi, editUser } from "./Api";
import history from "../../history";
import { removeToken } from "../../Utils";
import { AxiosResponse } from "axios";
import { AuthContextInterface, ProviderInterface, User } from "../../Interface";
import { CHECK_INTERNET_CONNECTION } from "../../Constants";
import Alert from "../../Components/Alert";

export const AuthContext = createContext<AuthContextInterface>({
  isSignedIn: false,
  user: null,
  loading: false,
  handleSignout: () => { },
  setLoading: (value: SetStateAction<boolean>) => { },
  getLoggedInUser: () => { },
  updateUser: (data: FormData) => { },
  setUser: () => { },
  setIsSignedIn: () => { }
});

export const AuthProvider: FC = (props: ProviderInterface): JSX.Element => {
  const { children } = props;
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignout = () => {
    removeToken();
    setIsSignedIn(false);
    history.push("/");
  };

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const user: User = await loggedInUserApi();
      setIsSignedIn(true);
      setUser(user);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.error(CHECK_INTERNET_CONNECTION)
      console.log(e);
    }
  };
  const updateUser = async (data: FormData) => {
    try {
      setLoading(true);
      const res: AxiosResponse<User> = await editUser(user?._id || "", data);

      setUser(res.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
      Alert.error(CHECK_INTERNET_CONNECTION)
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        user,
        loading,
        handleSignout,
        setLoading,
        getLoggedInUser,
        updateUser,
        setUser,
        setIsSignedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

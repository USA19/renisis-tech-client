import { FC, useContext, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { getToken } from "./Utils";
import { AuthRoutes, AppRoutes } from "./Routes";
import FullPageLoader from "./Components/FullPageLoader";
import { AuthContext } from "./Context/AuthContext/AuthContext";
import { PostProvider, PostContext } from "./Context/PostContext/PostContext";
import { SnackbarUtilsConfiguration, CloseButton } from "./Components/Alert";

const App: FC = (): JSX.Element => {
  const { isSignedIn, getLoggedInUser, loading } = useContext(AuthContext);
  const { fetchPosts } = useContext(PostContext);

  useEffect(() => {
    const token = getToken();
    if (token && !isSignedIn && !loading) {
      fetchPosts("1", "10");
      getLoggedInUser();
    }
  }, [fetchPosts, getLoggedInUser, isSignedIn, loading]);

  return (
    <Router>
      <PostProvider>
        <FullPageLoader />
        <SnackbarProvider maxSnack={1} autoHideDuration={3000} action={key => <CloseButton id={key} />}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}>
          <SnackbarUtilsConfiguration />
        </SnackbarProvider>

        <Routes>
          {isSignedIn || getToken()
            ? AppRoutes.map(({ component, path }, index) => (
              <Route
                path={path}
                element={component}
                key={path}
              />
            ))
            :
            AuthRoutes.map(({ component, path }, index) => (
              <Route
                path={path}
                element={component}
                key={path}
              />
            ))}
        </Routes>
      </PostProvider>
    </Router >
  );
}

export default App;

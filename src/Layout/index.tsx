// packages block
import { FC } from "react";
import { Box } from "@material-ui/core";
// components block
import Navbar from "./Navbar";
// interfaces/types and main layout styles block
import { layoutPropsType } from "../Interface";

const MainLayout: FC<layoutPropsType> = ({ children }): JSX.Element => (
  <Box>
    <Navbar />

    <Box component="main" pt={8}>
      {children}
    </Box>
  </Box>
);

export default MainLayout;

// packages block
import { useState, FC, MouseEvent, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography, Divider, Avatar
} from "@material-ui/core";
// components block
import history from "../history";
// utils, styles, context and constants block
import { useNavbarStyles } from "./styles";
import { AuthContext } from "../Context";
import { removeToken } from "../Utils";
import { LOGIN_ROUTE, LOGOUT, PROFILE, PROFILE_ROUTE } from "../Constants";
import { BOX_SHADOW_COLOR, WHITE } from "../theme";
import { baseUrl } from "../Context/BaseApi/server";

const Navbar: FC = () => {
  const classes = useNavbarStyles();
  const { setIsSignedIn, user, setUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    removeToken();
    setIsSignedIn(false);
    setUser(null);
    history.push(LOGIN_ROUTE);
  };

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const { email } = user || {}

  const renderMenu = (
    <Menu
      getContentAnchorEl={null}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem className={classes.userStatus}>
        <Box>
          <Typography variant="subtitle1">Signed in as</Typography>
          <Typography variant="subtitle1" color="primary">{email}</Typography>
        </Box>
      </MenuItem>

      <Link to={PROFILE_ROUTE} className={classes.textDecorationNone}>
        <MenuItem>
          <Typography variant="subtitle1" className={classes.textDecorationNone} color="inherit">{PROFILE}</Typography>
        </MenuItem>
      </Link>

      <Divider />

      <MenuItem onClick={handleLogout}>
        <Typography variant="subtitle1">{LOGOUT}</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box position="fixed" top={0} zIndex={23} bgcolor={WHITE} width='100%' boxShadow={`0px 0px 24px ${BOX_SHADOW_COLOR}`}>
      <AppBar position="static" color="transparent">
        <Container maxWidth="lg">
          <Box>
            <Toolbar disableGutters>
              <Box display='flex' alignItems="center" justifyContent="space-between" width="100%">
                <Link to="/" color="inherit" className={classes.heading}>
                  Renisis Tech
                </Link>

                <Box onClick={handleProfileMenuOpen}>
                  <IconButton
                    aria-label="show more"
                    aria-controls="mobileMenuId"
                    aria-haspopup="true"
                    color="inherit"
                    size="medium"
                  >
                    <Avatar src={`${baseUrl}${user?.profileImageUrl}`} />
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
            {renderMenu}
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar
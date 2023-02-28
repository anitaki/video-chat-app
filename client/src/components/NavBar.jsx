import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from '@mui/material/Link';
// import { Link } from "react-router-dom";
import logo from "../assets/vine2.png";
import vine from "../assets/vine.png";

function NavBar({ pages, settings, picture }) {

  //handle navbar clicks
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="success" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <img
            src={logo}
            alt="vine logo"
            style={{ width: "4.5rem", marginRight: ".5rem" }}
          />
          {/* Name of application on click leads to home page on bigger viewports */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ChatVine
          </Typography>
          {/* Hamburger menu with List of Pages for smaller viewports */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link style={{}} href={page.href}>
                    <Typography textAlign="center">{page.text}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Name of Chat application on smaller viewports, clicked leads to home page */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ChatVine
          </Typography>
          {/* List of Pages on larger viewports */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end"}}>
            {pages.map((page) => (
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  href={page.href}
                >
                  <Typography textAlign="center">{page.text}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Box>
          {/* Avatar with menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 3 }}>
                <Avatar alt="Profile picture with menu" src={picture || vine} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href={setting.href} underline="hover" color="secondary" focusVisible>
                    <Typography textAlign="center">{setting.text} </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

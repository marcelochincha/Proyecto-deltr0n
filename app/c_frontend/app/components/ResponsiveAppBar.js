"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Image from "next/image";
import logo from "../../public/logo.png";
import Input from "@mui/material/Input";
import { style } from "@mui/system";
import Link from 'next/link';
import {useState, useEffect} from 'react';

const Logito = (props) => (
  <Image
    priority={true}
    src={logo}
    alt="Picture of the author"
    width={100}
    height={100}
  />
);
const links = [
  {
    label: "Escribenos",
    url: "https://instagram.com/",
    img: "https://static.vecteezy.com/system/resources/previews/018/930/486/original/telegram-logo-telegram-icon-transparent-free-png.png",
    styleconfig: {
      width: "100px",
      height: "100px",
      padding: "0px",
    },
  },
  {
    label: "Carrito",
    url: "/carrito",
    img: "https://icon-library.com/images/shopping-cart-icon-white/shopping-cart-icon-white-12.jpg",
    styleconfig: {
      width: "40px",
      height: "40px",
      margin: "0 20px",
    },
  },
];
const settings = ["Login", "Sign up", "My account", "Logout"];

function ResponsiveAppBar() {

  let RUC_value
  if (typeof window !== "undefined") {
    RUC_value = localStorage.getItem("RUC") || ""
  }

  const [ruc, setRUC] = useState(RUC_value);

  // set ruc as "bienvenido" if ruc is not ""
  useEffect(() => {
    if(RUC_value == ""){
        setRUC("Bienvenido");
    } else {
        setRUC(RUC_value);
    }
  }, []);



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
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logito />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex", padding: "20px" },
              fontFamily: "monospace",
              fontWeight: 700,
              // letterSpacing: '.3rem',
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PCUnion
          </Typography>

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
              {links.map(({ label, url }) => (
                <MenuItem key={url} onClick={handleCloseNavMenu}>
                  <Typography textAlign="end">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
          ></Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: 5,
              justifyContent: "end",
            }}
          >
            {links.map(({ label, url, img, styleconfig }) => (
              <Button
                key={url}
                href={url}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "flex" }}
              >
                <img src={img} alt="" style={styleconfig} />
                {label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Configuración">
              <Button
                onClick={handleOpenUserMenu}
                sx={{ p: 5, color: "white", display: "flex" }}
              >
                <img
                  src="https://giftcards.woolworths.com.au/_ui/responsive/common/images/User_icon_white.png"
                  alt=""
                  className="w-9 h-9 mr-2"
                />
                {ruc}
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "70px" }}
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
                <Link
                  key={setting}
                  href={`/${setting.toLowerCase().replace(/\s+/g, "")}`}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        <Button
          href="/productos"
          onClick={handleCloseNavMenu}
          sx={{
            my: 2,
            color: "white",
            display: "flex",
            border: "1px solid white",
            left: "4%",
            fontWeight: "bold",
          }}
        >
          Productos
        </Button>

        <Input
          placeholder="🔎 Buscar artículo"
          sx={{
            display: { backgroundColor: "#ffffff" },
            padding: "10px",
            borderRadius: "7px",
            flexGrow: 1,
            left: "25%",
            maxWidth: "62%",
          }}
        />
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

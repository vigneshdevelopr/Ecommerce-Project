import React, { useEffect, useState } from 'react';
import {alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MoreIcon from '@mui/icons-material/MoreVert';
import { LogoutOutlined, ShoppingCart } from '@mui/icons-material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { styled } from 'styled-components';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [inactivityTimer, setInactivityTimer] = useState(null);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logOut = async () => {
    window.localStorage.clear()
    await navigate('/');
    await window.location.reload();

  };


   // Function to reset the inactivity timer
   const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);

    // Set a new timer to log out after 30 minutes of inactivity
    const newInactivityTimer = setTimeout(logOut, 120 * 60 * 1000); // 30 minutes in milliseconds
    setInactivityTimer(newInactivityTimer);
  };

  // Attach event listeners to reset the timer on user activity
  useEffect(() => {
    const activityEvents = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    
    const resetTimerOnActivity = () => {
      resetInactivityTimer();
    };

    activityEvents.forEach((event) => {
      document.addEventListener(event, resetTimerOnActivity);
    });

    // Clear the timer and remove event listeners when the component unmounts
    return () => {
      clearTimeout(inactivityTimer);
      activityEvents.forEach((event) => {
        document.removeEventListener(event, resetTimerOnActivity);
      });
    };
  }, [inactivityTimer]);

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MobileMenuItem onClick={() => navigate('/cart')}>
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={0} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </MobileMenuItem>
      <MobileMenuItem onClick={() => navigate('/home')}>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={0} color="error">
              <LocalMallIcon />
            </Badge>
          </IconButton>
          <p>Shop</p>
        </MenuItem>
      </MobileMenuItem>
      <MobileMenuItem onClick={logOut}>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <LogoutOutlined />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </MobileMenuItem>
    </Menu>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1, width: '100%', marginBottom: '60px' }}>
        <AppBar sx={{ bgcolor: '#131921' }} position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'flex', sm: 'block' } }}
            >
              Town Bazzar
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => navigate('/home')}
              >
                <Badge badgeContent={0} color="primary">
                  <LocalMallIcon />
                </Badge>
              </IconButton>
              <IconButton
                onClick={() => navigate('/cart')}
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                onClick={()=>{
                  navigate('/admin'),
                  window.location.reload();
                }}
                size="larger"
                color="inherit"
              >
                <Badge badgeContent={0} color="error">
                  <AccountCircle />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={logOut}
                color="inherit"
              >
                <LogoutOutlined />
              </IconButton>
            </Box>
            {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box> */}
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu} */}
      </Box>
    </div>
  );
}

const MobileMenuItem = styled.div`
  display: flex;
  align-items: center;
`;
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/contexts/auth-context';

// ----------------------------------------------------------------------

export function PublicHeader() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  const navigationItems = [
    { label: 'Universities', path: '/universities' },
  ];

  const isActive = (path: string) => router.pathname === path;

  return (
    <Box
      component="header"
      sx={{
        py: 2,
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(11px)',
        WebkitBackdropFilter: 'blur(11px)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: '100%',
        overflowX: 'hidden', // prevent horizontal scroll
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo/Title */}
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              cursor: 'pointer',
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: 0.5,
              flexShrink: 0,
              ...(isMobile && {
                maxWidth: '180px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }),
            }}
            onClick={() => router.push('/')}
          >
            Study Hub DUBAI
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant="text"
                  onClick={() => router.push(item.path)}
                  sx={{
                    position: 'relative',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    color: isActive(item.path)
                      ? 'primary.main'
                      : 'text.primary',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: -4,
                      width: isActive(item.path) ? '100%' : 0,
                      height: '2px',
                      bgcolor: 'primary.main',
                      transition: 'width 0.3s',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <Divider orientation="vertical" flexItem />

              <Button
                variant="outlined"
                onClick={() => router.push(isAuthenticated ? '/user' : '/sign-in')}
              >
                {isAuthenticated ? 'Dashboard' : 'Sign In'}
              </Button>
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Hamburger menu */}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {navigationItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    selected={isActive(item.path)}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </MenuItem>
                ))}

                {/* Auth menu item */}
                <MenuItem
                  onClick={() =>
                    handleNavigation(isAuthenticated ? '/user' : '/sign-in')
                  }
                >
                  {isAuthenticated ? 'Dashboard' : 'Sign In'}
                </MenuItem>
              </Menu>
            </Box>
          )}

        </Box>
      </Container>
    </Box>
  );
}

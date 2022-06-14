import { useUser } from '@auth0/nextjs-auth0';
import { Typography, AppBar, Toolbar, Container, IconButton, Menu, Divider, SxProps, Theme } from '@mui/material';
import { Box } from '@mui/system';
import { navItems } from '@utils/navItem';
import { extractSocialMedia } from '@utils/socialMedia';
import { Menu as MenuIcon } from 'mdi-material-ui';
import * as React from 'react';

import Link from './Link';

export interface HeaderProps {
 title: string;
 socialMedia: {
   twitter?: string;
   facebook?: string;
   linkedIn?: string;
   github?: string;
 };
 sx?: SxProps<Theme>;
}

export const Header: React.FC<HeaderProps> = ({ title, socialMedia, sx = [] }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const { user } = useUser();

  const socialMediaItems = extractSocialMedia(socialMedia);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static"
            color="default"
            elevation={0}
            component="header"
            sx={[
              { borderBottom: (theme) => `1px solid ${theme.palette.divider}` },
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          {/* title when large */}
          <Link color="inherit" underline="none" href="/blog" sx={{ display: { xs: 'none', md: 'flex' }}}>
            <Typography variant="h6" color="inherit" noWrap>
              { title?.toUpperCase() }
            </Typography>
          </Link>

          {/* menu when small */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {navItems.filter(item => !item.isProtected || !!user).map((item, index) => (
                  <Link
                    key={index}
                    variant="button"
                    color="text.primary"
                    underline="none"
                    href={item.url}
                    sx={{ display: 'inline-block', my: 1, mx: 1.5 }}
                  >
                    {item.label}
                  </Link>
                ))}

                {(socialMediaItems.length > 0) && (<Divider />)}

                {socialMediaItems.map((item, index) => (
                  <Link
                    key={index}
                    variant="button"
                    color="text.primary"
                    underline="none"
                    title={item.name}
                    href={item.url}
                    sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
                  >
                    <item.icon />
                  </Link>
                ))}
              </Box>
            </Menu>
          </Box>

          {/* title when small */}
          <Link color="inherit" underline="none" href="/blog" sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            <Typography variant="h6" color="inherit" noWrap>
              { title?.toUpperCase() }
            </Typography>
          </Link>

          {/* menu when large */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            flex: '1 0 auto',
            ml: (theme) => theme.spacing(4),
          }}>
            {navItems.filter(item => !item.isProtected || !!user).map((item, index) => (
              <Link
                key={index}
                variant="button"
                color="text.primary"
                underline="none"
                href={item.url}
                sx={{ display: 'inline-block', my: 1, mx: 1.5 }}
              >
                {item.label}
              </Link>
            ))}
          </Box>

          {/* social media icons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', }}>
            {socialMediaItems.map((item, index) => (
              <Link
                key={index}
                variant="button"
                color="text.primary"
                underline="none"
                title={item.name}
                href={item.url}
                sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
              >
                <item.icon />
              </Link>
            ))}
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

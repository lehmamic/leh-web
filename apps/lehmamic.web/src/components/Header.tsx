import { Typography, AppBar, Toolbar, Container, IconButton, Menu, MenuItem, Button, Tooltip, Avatar, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { Facebook, Github, Linkedin, Menu as MenuIcon, Twitter } from 'mdi-material-ui';
import * as React from 'react';

import Link from './Link';

export interface HeaderProps {
 title: string;
 socialMedia: {
   twitter?: string;
   facebook?: string;
   linkedIn?: string;
   github?: string;
 }
}

export const Header: React.FC<HeaderProps> = ({ title, socialMedia }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

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
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          {/* title when large */}
          <Link color="inherit" underline="none" href="/" sx={{ display: { xs: 'none', md: 'flex' }}}>
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
              <Box sx={{display: 'flex', flexDirection: 'column' }}>
                <Link
                  variant="button"
                  color="text.primary"
                  underline="none"
                  href="/blog"
                  sx={{ display: 'inline-block', my: 1, mx: 1.5 }}
                >
                  Blog
                </Link>
                <Link
                  variant="button"
                  color="text.primary"
                  underline="none"
                  href="/about"
                  sx={{ display: 'inline-block', my: 1, mx: 1.5 }}
                >
                  About
                </Link>

                {!(socialMedia?.facebook || socialMedia?.twitter || socialMedia?.linkedIn || socialMedia?.github) && (<Divider />)}

                {!!socialMedia?.facebook &&<Link
                  variant="button"
                  color="text.primary"
                  underline="none"
                  href={`https:www.facebook.com/${socialMedia.facebook}`}
                  sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
                >
                  <Facebook />
                </Link>}
                {!!socialMedia?.twitter && <Link
                  variant="button"
                  color="text.primary"
                  underline="none"
                  href={`https:twitter.com/${socialMedia.twitter.replace('@', '')}`}
                  sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
                >
                  <Twitter />
                </Link>}
                {!!socialMedia?.linkedIn && <Link
                  variant="button"
                  color="text.primary"
                  underline="none"
                  href={`https://www.linkedin.com/in/${socialMedia.linkedIn}`}
                  sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
                >
                  <Linkedin />
                </Link>}
                {!!socialMedia?.github && <Link
                  variant="button"
                  color="text.primary"
                  underline="none"
                  href={`https://github.com/${socialMedia.github}`}
                  sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
                >
                  <Github />
                </Link>}
              </Box>
            </Menu>
          </Box>

          {/* title when small */}
          <Link color="inherit" underline="none" href="/" sx={{
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
            <Link
                variant="button"
                color="text.primary"
                underline="none"
                href="/blog"
                sx={{ display: 'inline-block', my: 1, mx: 1.5 }}
            >
              Blog
            </Link>
            <Link
              variant="button"
              color="text.primary"
              underline="none"
              href="/about"
              sx={{ display: 'inline-block', my: 1, mx: 1.5 }}
            >
              About
            </Link>
                 {/* {user && (
                   <Link
                     variant="button"
                     color="text.primary"
                     underline="none"
                     href="/admin/site"
                     sx={{ display: 'inline-block', my: 1, mx: 1.5 }}
                   >
                     Admin
                   </Link>
                 )} */}
          </Box>

          {/* social media icons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignSelf: 'flex-end' }}>
            {!!socialMedia?.facebook &&<Link
              variant="button"
              color="text.primary"
              underline="none"
              href={`https:www.facebook.com/${socialMedia.facebook}`}
              sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
            >
              <Facebook />
            </Link>}
            {!!socialMedia?.twitter && <Link
              variant="button"
              color="text.primary"
              underline="none"
              href={`https:twitter.com/${socialMedia.twitter.replace('@', '')}`}
              sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
            >
              <Twitter />
            </Link>}
            {!!socialMedia?.linkedIn && <Link
              variant="button"
              color="text.primary"
              underline="none"
              href={`https://www.linkedin.com/in/${socialMedia.linkedIn}`}
              sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
            >
              <Linkedin />
            </Link>}
            {!!socialMedia?.github && <Link
              variant="button"
              color="text.primary"
              underline="none"
              href={`https://github.com/${socialMedia.github}`}
              sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
            >
              <Github />
            </Link>}
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

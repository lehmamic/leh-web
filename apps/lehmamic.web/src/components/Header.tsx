import { Typography, AppBar, Toolbar, Container } from '@mui/material';
import { Box } from '@mui/system';
import { Facebook, Github, Linkedin, Twitter } from 'mdi-material-ui';
import * as React from 'react';

import Link from './Link';

export interface HeaderProps {
 title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user } = { user: null };
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <nav>
        <Container maxWidth="lg">
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Box>
              <Link color="inherit" underline="none" href="/">
                <Typography variant="h6" color="inherit" noWrap>
                 { title?.toUpperCase() }
                </Typography>
              </Link>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: '1 0 auto',
                ml: (theme) => theme.spacing(4),
              }}
            >
              <Box>
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
                {user && (
                  <Link
                    variant="button"
                    color="text.primary"
                    underline="none"
                    href="/admin/site"
                    sx={{ display: 'inline-block', my: 1, mx: 1.5 }}
                  >
                    Admin
                  </Link>
                )}
              </Box>
              <Box sx={{ alignSelf: 'flex-end' }}>
                <Link
                  variant="button"
                  color="text.primary"
                  underline="none"
                  href="https://www.facebook.com/lehmamic"
                  sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
                >
                  <Facebook />
                </Link>
                <Link
                  variant="button"
                  color="text.primary"
                  underline="none"
                  href="https://twitter.com/lehmamic"
                  sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
                >
                  <Twitter />
                </Link>
                <Link
                  variant="button"
                  color="text.primary"
                  underline="none"
                  href="https://www.linkedin.com/in/michael-lehmann-694b6799/"
                  sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
                >
                  <Linkedin />
                </Link>
                <Link
                  variant="button"
                  color="text.primary"
                  underline="none"
                  href="https://github.com/lehmamic"
                  sx={{ display: 'inline-block', my: 1, mx: 1.5, pt: '8px' }}
                >
                  <Github />
                </Link>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </nav>
    </AppBar>
  );
};

import { Box } from '@mui/material';
import * as React from 'react';

export interface PreviewBannerProps {
  text: string;
}

export const PreviewBanner: React.FC<PreviewBannerProps> = ({ text }) => {
  return (
    <Box sx={(theme) => ({
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
      textAlign: 'center',
    })}
    >{text}</Box>
  );
};

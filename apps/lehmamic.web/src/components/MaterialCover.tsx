import { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

export interface MaterialCoverProps {
  coverImage: string;
  sx?: SxProps<Theme>;
}

export const MaterialCover: React.FC<MaterialCoverProps> = ({ sx = [], coverImage }: MaterialCoverProps) => {
  return (
    <Box
      sx={
        [
          {
            width: '100%',
            height: '340px',
            background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("${coverImage}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            overflow: 'hidden',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ] as any
      }
    ></Box>
  );
};

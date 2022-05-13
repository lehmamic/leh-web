import { Box, MenuList, SxProps, Theme, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export interface MenuSectionProps {
  title: string;
  sx?: SxProps<Theme>;
};

export const NavSection: React.FC<PropsWithChildren<MenuSectionProps>> = ({ title, children, sx }) => {
  return (
    <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography
        align="left"
        variant="caption"
        display="block"
        sx={(theme) => ({ paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) })}
      >
        {title}
      </Typography>
      <MenuList>{children}</MenuList>
    </Box>
  );
};

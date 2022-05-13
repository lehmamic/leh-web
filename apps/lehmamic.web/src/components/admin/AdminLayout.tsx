import { PageHead, PageHeaderProps } from "@components/PageHead";
import { Box, Container, Drawer } from "@mui/material";
import { TextBoxMultipleOutline } from "mdi-material-ui";
import { PropsWithChildren } from "react";
import { NavItem } from "./NavItem";
import { NavSection } from "./NavSection";

export type AdminLayoutProps = PageHeaderProps

const drawerWidth = 240;

export const AdminLayout: React.FC<PropsWithChildren<AdminLayoutProps>> = (props) => {
  return (
    <Box component="main" sx={{ display: 'flex', flexDirection: 'column' }}>
      <PageHead {...props} />
      <Box sx={{ display: 'flex' }}>
        {/* {head()} */}
        <Drawer
          variant="persistent"
          anchor="left"
          open
          sx={(theme) => ({
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, paddingTop: theme.spacing(4) },
          })}
        >
          <NavSection title="MANAGE" sx={(theme) =>({mt: theme.spacing(2) }) }>
            <NavItem label="Posts" icon={<TextBoxMultipleOutline />} route="/admin/manage/posts" />
          </NavSection>
        </Drawer>
        <Container
          sx={(theme) => ({
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            height: '100vh',
            overflow: 'auto',
          })}
        >
          {props.children}
        </Container>
      </Box>
    </Box>
  );
};


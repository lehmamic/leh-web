import Link from '@components/Link';
import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

export interface NavItemProps {
  label: string;
  icon: JSX.Element;
  route: string;
}

export const NavItem: React.FC<NavItemProps> = ({ label, icon, route }) => {
  const router = useRouter();

  return (
    <Box sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}>
      <Link href={route} underline="none">
         <MenuItem selected={route === router.route}>
           <ListItemIcon>{icon}</ListItemIcon>
           <ListItemText primary={label} />
           {/* {navItem.link && (
             <>
               <Link
                 href={navItem.link}
                 target="_blank"
                 color="inherit"
                 underline="none"
                 onClick={handleLinkClick}
                 sx={{ display: 'inline-flex', color: 'text.primary' }}
               >
                 <ListItemIcon sx={{ minWidth: 0 }}>
                   <OpenInNew />
                 </ListItemIcon>
               </Link>
             </>
           )} */}
         </MenuItem>
       </Link>
    </Box>
  );
};

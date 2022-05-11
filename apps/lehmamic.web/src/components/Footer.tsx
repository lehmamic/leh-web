import { Container, Typography } from "@mui/material";
import dayjs from 'dayjs';

export interface FooterProps {
  title: string;
}

export const Footer: React.FC<FooterProps> = ({ title }) => {
  return (
    <Container maxWidth="md" component="footer" sx={(theme) => ({ pt: theme.spacing(2), pb: theme.spacing(1) })}>
      <Typography variant="subtitle1" sx={(theme) => ({ color: theme.palette.grey[500]})}>
        {`© ${dayjs().year()} ${title}. All Rights Reserved.`}
      </Typography>
    </Container>
  );
}

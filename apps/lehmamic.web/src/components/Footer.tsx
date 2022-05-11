import { Container, Typography } from "@mui/material";
import dayjs from 'dayjs';

export interface FooterProps {
  title: string;
}

export const Footer: React.FC<FooterProps> = ({ title }) => {
  return (
    <Container maxWidth="lg" component="footer">
      <Typography variant="subtitle1" sx={(theme) => ({ my: theme.spacing(2) })}>
        {`© ${dayjs().year()} ${title}. All Rights Reserved.`}
      </Typography>
    </Container>
  );
}

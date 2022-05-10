import { Container } from "@mui/material";
import { PropsWithChildren } from "react";
import { Header } from "./Header";
import { MaterialCover } from "./MaterialCover";
import { PageHead, PageHeaderProps } from "./PageHead";

export type LayoutProps = PageHeaderProps

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = (props) => {
  return (
    <main>
      <PageHead {...props} />
      <Header title={props.title} socialMedia={props.socialMedia} />
      <MaterialCover coverImage={props.imageUrl ?? ''} />
      <Container maxWidth="lg" component="article" sx={(theme) => ({ mt: theme.spacing(5) })}>
        {props.children}
      </Container>
    </main>
  );
}

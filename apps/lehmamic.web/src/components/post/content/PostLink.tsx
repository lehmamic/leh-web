import Link from "@components/Link";
import { Box } from "@mui/material";

export type PostLinkProps = Pick<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  "href" | "children"
>;

export const PostLink: React.FC<PostLinkProps> = ({ href, children }: PostLinkProps) => {
  if (!href) throw new Error("No href!");

  return (
    <Box component="span" sx={{ display: 'inline-flex'}} >
      <Link href={href}>{children}</Link>
    </Box>
  );
}

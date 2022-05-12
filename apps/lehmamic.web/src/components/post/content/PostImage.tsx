import { Box } from "@mui/material";
import Image from "next/image";

export type PostImageProps = Pick<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "src" | "alt"
>;

export const PostImage: React.FC<PostImageProps> = ({ src, alt }: PostImageProps) => {
  if (!src) throw new Error("No src!");
  if (!alt) throw new Error("No alt!");
  const altParts = alt.split("|");
  const widthAndHeightParts = altParts[1].trim().split("x");
  const width = Number(widthAndHeightParts[0]);
  const height = Number(widthAndHeightParts[1]);
  const priority = altParts[2]?.trim() === "priority";

  return (
    <Box component="span" sx={{ display: 'inline-flex', width: '100%', justifyContent: 'center'}} >
      <Image
        src={src}
        alt={altParts[0].trim()}
        width={width}
        height={height}
        priority={priority}
      />
    </Box>
  );
}

import dynamic from "next/dynamic";
import 'easymde/dist/easymde.min.css';
import { styled } from "@mui/material";

export const SimpleMDE = styled(dynamic(() => import("react-simplemde-editor"), { ssr: false }))(theme => ({}));

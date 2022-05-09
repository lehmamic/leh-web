
import { remark } from 'remark'
import strip from 'strip-markdown'

export const removeMarkdown = (value: string): string =>{
  return String(remark()
    .use(strip)
    .processSync(value));
}

export const clampContent = (value: string, maxLength: number): string => {
  if (!value || value.length <= maxLength) {
    return value;
  }

  return `${value.substring(0, maxLength)}...`;
};

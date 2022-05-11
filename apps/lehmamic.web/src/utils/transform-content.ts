import { BlogPost } from '@models/blog-post';
import { ReactElement } from './../../../../node_modules/rehype-react/lib/index.d';

import { remark } from 'remark';
import strip from 'strip-markdown';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeReact, { Options } from 'rehype-react';
import { createElement, Fragment } from 'react';

export const removeMarkdown = (value: string): string =>{
  return String(remark()
    .use(strip)
    .processSync(value));
}

export const markdownToReact = (value: string): ReactElement => {
  const rehypeReactOptions: Options = {
    createElement,
    Fragment,
    components: {
      // img: PostImage,
      // pre: PostPre,
      // h2: PostH2,
      // h3: PostH3,
      // h4: PostH4,
      // h5: PostH5,
      // h6: PostH6,
    },
  };

  return unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeSanitize, {
      ...defaultSchema,
      clobberPrefix: '',
      attributes: {
        ...defaultSchema.attributes,
        code: [...(defaultSchema.attributes?.code || []), 'className'],
      },
    })
    .use(rehypeReact, rehypeReactOptions)
    .processSync(value)
    .result;
}

export const clampContent = (value: string, maxLength: number): string => {
  if (!value || value.length <= maxLength) {
    return value;
  }

  return `${value.substring(0, maxLength)}...`;
};

export const extractBlogPostDescription = (post: BlogPost): string => {
  const description = post.description && post.description != '' ? post.description : removeMarkdown(post.content);
  return clampContent(description, 265);
}

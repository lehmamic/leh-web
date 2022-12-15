import { BlogPost } from '@models/blog-post';
import { ReactElement } from 'rehype-react/lib/index.d';

import { remark } from 'remark';
import strip from 'strip-markdown';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypePrism from 'rehype-prism-plus/common';
import rehypeReact, { Options } from 'rehype-react';
import { createElement, Fragment } from 'react';
import { PostImage } from '@components/post/content/PostImage';
import { PostLink } from '@components/post/content/PostLink';
import readingTime, { ReadTimeResults } from 'reading-time';

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
      img: PostImage,
      a: PostLink,
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
    .use(rehypePrism)
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

export const extractReadingTime = (post: BlogPost): ReadTimeResults => {
  return readingTime(post.content);
}

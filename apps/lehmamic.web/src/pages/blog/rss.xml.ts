import { BlogPostType, BlogPostStatus } from "@models/blog-post";
import { getBlogPosts } from "@services/blog-post.service";
import { getSettings } from "@services/settings.service";
import { extractBlogPostDescription } from "@utils/transform-content";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";

function RSS() {
  // getServerSideProps will do the heavy lifting
}

export default RSS;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const rss = await generateRss();

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.write(rss);
  res.end();

  return { props: {} };

  async function generateRss() {
    const settings = await getSettings();
    const posts = await getBlogPosts({ type: BlogPostType.Post, status: BlogPostStatus.Published });

    const channelLastChanged = dayjs
      .max(posts.map((p) => dayjs(p.modifiedAt)))
      .format(rssDateFormat);

    return `<?xml version="1.0" encoding="UTF-8"?>
     <rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:webfeeds="http://webfeeds.org/rss/1.0" version="2.0">
       <channel>
         <title>${settings.title}</title>
         <link>${settings.baseUrl}blog</link>
         <description>${settings.description}</description>
         <language>en-us</language>
         <ttl>60</ttl>
         <lastBuildDate>${channelLastChanged}</lastBuildDate>
         <atom:link href="${settings.baseUrl}blog/rss.xml" rel="self" type="application/rss+xml" />
         <webfeeds:cover image="${settings.coverImageUrl}" />
         <webfeeds:icon>${settings.baseUrl}favicon.ico</webfeeds:icon>
         <webfeeds:logo>${settings.baseUrl}favicon.png</webfeeds:logo>
         <webfeeds:accentColor>000000</webfeeds:accentColor>
         ${posts
           .map(
             (post) => `
           <item>
             <title>${cdata(`${post.title}`)}</title>
             <description>${cdata(extractBlogPostDescription(post))}</description>
             <pubDate>${dayjs(post.publishedAt).format(rssDateFormat)}</pubDate>
             <link>${settings.baseUrl}blog/${post.slug}</link>
             <guid>${settings.baseUrl}blog/${post.slug}</guid>
           </item>`
           )
           .join("")}
       </channel>
     </rss>
   `;
  }
};

function cdata(s: string) {
  return `<![CDATA[${s}]]>`;
}

const rssDateFormat = "ddd, DD MMM YYYY HH:mm:ss ZZ";

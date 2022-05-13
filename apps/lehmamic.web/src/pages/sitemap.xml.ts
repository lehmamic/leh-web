import { BlogPost, BlogPostType, BlogPostStatus } from '@models/blog-post';
import { getSettings } from '@services/settings.service';
import { getBlogPosts } from '@services/blog-post.service';
import dayjs from "dayjs";
import { GetServerSideProps } from "next";

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

const sitemapDateFormat = "YYYY-MM-DD";
const homePageLastModified = "2022-04-30";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = await generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };

  async function generateSiteMap() {
    const settings = await getSettings();
    const posts = await getBlogPosts({ status: BlogPostStatus.Published });

    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${settings.baseUrl}blog</loc>
         <lastmod>${await getHomePageLastModified(posts)}</lastmod>
       </url>
       ${posts
         .map(({ type, slug, modifiedAt: modifedAt }) => {
           const baseUrl = type === BlogPostType.Post ? `${settings.baseUrl}blog`: settings.baseUrl;
           return `
         <url>
             <loc>${baseUrl}${slug}</loc>
             <lastmod>${dayjs(modifedAt).format(sitemapDateFormat)}</lastmod>
         </url>
       `;
         })
         .join("")}
     </urlset>
   `;
  }

  async function getHomePageLastModified(posts: BlogPost[]) {
    await import("@utils/dayjs.plugins");
    return dayjs
      .max(
        [dayjs(homePageLastModified)].concat(
          posts.map((p) => dayjs(p.modifiedAt))
        )
      )
      .format(sitemapDateFormat);
  }
};

export default SiteMap;

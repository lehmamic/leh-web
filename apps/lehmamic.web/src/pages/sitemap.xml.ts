import { getBlogPostsPaged } from '@services/blog-post.service';
import { BlogPost, BlogPostType, BlogPostStatus } from '@models/blog-post';
import { getSettings } from '@services/settings.service';
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { DEFAULT_PAGE_SIZE } from './blog';

const SiteMap = () => {
  // getServerSideProps will do the heavy lifting
}

export default SiteMap;

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

    const pagedPosts = await getBlogPostsPaged({ type: BlogPostType.Post, status: BlogPostStatus.Published }, { publishedAt: -1 }, 0, 10000);
    const pagedPages = await getBlogPostsPaged({ type: BlogPostType.Page, status: BlogPostStatus.Published }, { publishedAt: -1 }, 0, 10000);

    const totalPages = Math.ceil(pagedPosts.total / DEFAULT_PAGE_SIZE);
    const pages = [...Array(totalPages).keys()].map(i => i + 1);

    const lastTimeModified = await getHomePageLastModified(pagedPages.data.concat(pagedPosts.data));

    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${settings.baseUrl}blog</loc>
         <lastmod>${lastTimeModified}</lastmod>
       </url>
       ${pages
        .map((page) => {
          return `
        <url>
            <loc>${settings.baseUrl}blog?page=${page}</loc>
            <lastmod>${lastTimeModified}</lastmod>
        </url>
      `;
        })
        .join('')}
       ${pagedPosts.data
         .map(({ slug, modifiedAt: modifedAt }) => {
           return `
         <url>
             <loc>${settings.baseUrl}blog${slug}</loc>
             <lastmod>${dayjs(modifedAt).format(sitemapDateFormat)}</lastmod>
         </url>
       `;
         })
         .join('')}
         ${pagedPages.data
          .map(({ slug, modifiedAt: modifedAt }) => {
            return `
          <url>
              <loc>${settings.baseUrl}${slug}</loc>
              <lastmod>${dayjs(modifedAt).format(sitemapDateFormat)}</lastmod>
          </url>
        `;
          })
          .join('')}
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

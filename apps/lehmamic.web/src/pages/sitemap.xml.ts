import { getSettings } from './../services/settings.service';
import { getAllBlogPosts, getBlogPosts } from './../services/blog-post.service';
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
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${settings.baseUrl}/blog</loc>
         <lastmod>${await getHomePageLastModified()}</lastmod>
       </url>
       ${(await getAllBlogPosts())
         .map(({ slug, modifedAt }) => {
           return `
         <url>
             <loc>${settings.baseUrl}/${slug}</loc>
             <lastmod>${dayjs(modifedAt).format(sitemapDateFormat)}</lastmod>
         </url>
       `;
         })
         .join("")}
     </urlset>
   `;
  }

  async function getHomePageLastModified() {
    await import("../utils/dayjs.plugins");
    return dayjs
      .max(
        [dayjs(homePageLastModified)].concat(
          (await getAllBlogPosts()).map((p) => dayjs(p.modifedAt))
        )
      )
      .format(sitemapDateFormat);
  }
};

export default SiteMap;

import Head from "next/head";

export interface PageHeaderProps {
  title: string;
  contentTitle?: string;
  description: string;
  baseUrl: string;
  path: string;
  next?: string;
  prev?: string;
  imageUrl?: string;
  preview?: boolean;
  socialMedia: {
    twitter?: string;
    facebook?: string;
    linkedIn?: string;
    github?: string;
  };
  disqus: {
    shortName?: string;
  };
 }

 export const PageHead: React.FC<PageHeaderProps> = ({ title, contentTitle, description, baseUrl, path, prev, next, imageUrl, socialMedia }) => {
   const fullTitle = contentTitle ? `${title} - ${contentTitle}` : title;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      <link rel="canonical" href={`${baseUrl}${path}`} />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      {!!prev && (
        <link rel="prev" href={`${baseUrl}${prev}`} />
      )}
      {!!next && (
        <link rel="next" href={`${baseUrl}${next}`} />
      )}


      <meta property="og:url" content={`${baseUrl}${path}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
      <meta property="og:image:type" content="image/png" />
      <meta property="article:publisher" content={`https://www.facebook.com/${socialMedia.facebook}`} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={baseUrl} />
      <meta name="twitter:image" content={imageUrl} />
      <meta property="twitter:site" content={socialMedia.twitter} />
      <meta property="twitter:creator" content={socialMedia.twitter} />
    </Head>
  );
 }

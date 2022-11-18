// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withBunyan = require('next-bunyan');
// const { withPlausibleProxy } = require('next-plausible')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  reactStrictMode: true,
  images: {
    domains: ['ik.imagekit.io'],
  },
  experimental: {
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: false,
      },
      {
        source: '/admin',
        destination: '/admin/manage/posts',
        permanent: false,
      },
      {
        source: '/admin/manage',
        destination: '/admin/manage/posts',
        permanent: false,
      },
      {
        source: '/async-file-upload-with-nextjs',
        destination: '/blog/async-file-upload-with-nextjs',
        permanent: true,
      },
      {
        source: '/welcome-to-my-new-blog',
        destination: '/blog/welcome-to-my-new-blog',
        permanent: true,
      },
      {
        source: '/leveraging-existing-libraries-to-setup-a-console-application',
        destination: '/blog/leveraging-existing-libraries-to-setup-a-console-application',
        permanent: true,
      },
      {
        source: '/implement-resource-based-authorization-with-angular',
        destination: '/blog/implement-resource-based-authorization-with-angular',
        permanent: true,
      },
      {
        source: '/implement-resource-based-authorization-with-asp-net-core',
        destination: '/blog/implement-resource-based-authorization-with-asp-net-core',
        permanent: true,
      },
      {
        source: '/syntax-highlighting-support-for-additional-languages',
        destination: '/blog/syntax-highlighting-support-for-additional-languages',
        permanent: true,
      },
      {
        source: '/resource-based-authorization-model',
        destination: '/blog/resource-based-authorization-model',
        permanent: true,
      },
    ]
  },
};

module.exports = withBunyan(withNx(nextConfig));

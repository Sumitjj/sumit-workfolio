/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.sumitworkfolio.in',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    '/api/*',
    '/_next/*',
    '/404',
    '/500',
    '/admin/*',
    '/private/*'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/_next/*',
          '/admin/*',
          '/private/*',
          '/*.json',
          '/*.xml'
        ],
      },
    ],
    additionalSitemaps: [
      'https://www.sumitworkfolio.in/sitemap.xml',
    ],
  },
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.7;
    let changefreq = 'weekly';

    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }

    // Projects get high priority
    if (path.startsWith('/projects/')) {
      priority = 0.9;
      changefreq = 'monthly';
    }

    // Experience and certifications get medium-high priority
    if (path.startsWith('/experience/') || path.startsWith('/certifications/')) {
      priority = 0.8;
      changefreq = 'monthly';
    }

    // Contact page gets medium priority
    if (path === '/contact') {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://www.sumitworkfolio.in${path}`,
          hreflang: 'en',
        },
      ],
    };
  },
};

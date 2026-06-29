/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://orabthic.com",
  generateRobotsTxt: true,
  alternateRefs: [
    { href: "https://orabthic.com/en", hreflang: "en" },
    { href: "https://orabthic.com/ar", hreflang: "ar" },
  ],
};

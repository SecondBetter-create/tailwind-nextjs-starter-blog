const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000')
const deploymentUrl = configuredSiteUrl.replace(/\/+$/, '')

/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'PensioenWijzer',
  author: 'Marc Janse',
  headerTitle: 'PensioenWijzer',

  description: 'Begrijp hoe AOW, werkgeverspensioen, belastingen en geldstromen samenhangen.',

  language: 'nl-NL',
  locale: 'nl-NL',

  theme: 'system',
  stickyNav: true,

  siteUrl: deploymentUrl,

  siteRepo: '',

  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,

  socialBanner: `${process.env.BASE_PATH || ''}/static/images/pensioenwijzer-social.png`,

  email: '',

  analytics: {},

  newsletter: {
    provider: '',
  },

  comments: {
    provider: '',
  },

  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata

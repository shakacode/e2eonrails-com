import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'E2E on Rails',
  tagline: 'The Rails test bridge for Cypress and Playwright.',
  favicon: 'img/favicon.ico',
  url: 'https://e2eonrails.com',
  baseUrl: '/',
  organizationName: 'shakacode',
  projectName: 'e2eonrails-com',
  onBrokenLinks: 'warn',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
      },
    ],
    '@docusaurus/theme-mermaid',
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [{from: '/docs', to: '/docs/getting-started'}],
      },
    ],
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl: ({docPath}) =>
            `https://github.com/shakacode/cypress-playwright-on-rails/tree/master/docs/${docPath}`,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'E2E on Rails',
      logo: {
        alt: 'E2E on Rails Logo',
        src: 'img/icon-tile.svg',
      },
      items: [
        {type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Docs'},
        {to: '/', label: 'Home', position: 'left'},
        {
          href: 'https://github.com/shakacode/cypress-playwright-on-rails',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://rubygems.org/gems/cypress-on-rails',
          label: 'RubyGems',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started'},
            {label: 'Cypress', to: '/docs/cypress'},
            {label: 'Playwright', to: '/docs/playwright'},
            {label: 'FactoryBot', to: '/docs/factory-bot'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/shakacode/cypress-playwright-on-rails',
            },
            {
              label: 'RubyGems',
              href: 'https://rubygems.org/gems/cypress-on-rails',
            },
            {
              label: 'ShakaStack',
              href: 'https://shakastack.com',
            },
            {
              label: 'ShakaCode',
              href: 'https://www.shakacode.com',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} ShakaCode.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

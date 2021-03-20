/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Deku SMS Manager',
  tagline: 'Dashboard for managing Deku instances',
  url: 'https://smswithoutborders.github.io',
  baseUrl: '/Deku-SMS-Manager/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'SMSwithoutBorders', // Usually your GitHub org/user name.
  projectName: 'Deku-SMS-Manager', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Deku SMS Manager',
      logo: {
        alt: 'logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/SMSwithoutBorders/Deku-SMS-Manager',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/smswithoutborders',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/smswithoutborders',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/smswithoutborders',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/SMSwithoutBorders/Deku-SMS-Manager',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SMSwithoutBorders. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

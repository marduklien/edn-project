import { defineConfig } from 'vite';
import ejs from 'ejs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoName = 'edn-project';
const htmlEntries = ['index.html', 'about.html', 'product.html', 'contact.html'];

const site = {
  name: 'EDN Project',
  description: 'Bootstrap 5.3 + Sass 7-1 + Vite multi-page starter',
};

const navItems = [
  { key: 'index', label: 'Home', href: './index.html' },
  { key: 'about', label: 'About', href: './about.html' },
  { key: 'product', label: 'Product', href: './product.html' },
  { key: 'contact', label: 'Contact', href: './contact.html' },
];

const pages = {
  index: {
    key: 'index',
    title: 'Home | EDN Project',
    description: 'Landing page for the EDN Project Vite multi-page starter.',
  },
  about: {
    key: 'about',
    title: 'About | EDN Project',
    description: 'About page for the EDN Project Vite multi-page starter.',
  },
  product: {
    key: 'product',
    title: 'Product | EDN Project',
    description: 'Product page for the EDN Project Vite multi-page starter.',
  },
  contact: {
    key: 'contact',
    title: 'Contact | EDN Project',
    description: 'Contact page for the EDN Project Vite multi-page starter.',
  },
};

function htmlEjsPlugin(base) {
  return {
    name: 'edn-html-ejs-transform',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const currentHtml = ctx.filename ? path.basename(ctx.filename) : 'index.html';
        const pageKey = path.basename(currentHtml, '.html');
        const page = pages[pageKey] || pages.index;

        return ejs.render(
          html,
          {
            site,
            page,
            navItems,
            base,
            currentHtml,
          },
          {
            filename: path.resolve(__dirname, currentHtml),
            root: __dirname,
          },
        );
      },
    },
  };
}

export default defineConfig(({ command }) => {
  const base = command === 'build' ? `/${repoName}/` : '/';
  const input = Object.fromEntries(
    htmlEntries.map((entry) => [path.basename(entry, '.html'), entry]),
  );

  return {
    appType: 'mpa',
    base,
    plugins: [htmlEjsPlugin(base)],
    build: {
      rollupOptions: {
        input,
      },
    },
  };
});

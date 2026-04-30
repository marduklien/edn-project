import { defineConfig } from 'vite';
import ejs from 'ejs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoName = 'edn-project';

const site = {
  name: 'EDN Project',
  description: 'Bootstrap + Sass 7-1 + Vite + EJS 多頁面練習專案',
};

const navItems = [
  { key: 'index', label: '首頁', href: './index.html' },
  { key: 'about', label: '關於我們', href: './about.html' },
  { key: 'product', label: '產品服務', href: './product.html' },
  { key: 'contact', label: '聯絡我們', href: './contact.html' },
];

const pages = {
  index: {
    key: 'index',
    title: '首頁｜EDN Project',
    description: 'EDN Project 首頁，Bootstrap Sass 客製化與 Vite MPA 練習。',
  },
  about: {
    key: 'about',
    title: '關於我們｜EDN Project',
    description: '認識 EDN Project 的專案目標與前端練習架構。',
  },
  product: {
    key: 'product',
    title: '產品服務｜EDN Project',
    description: 'EDN Project 產品服務展示頁。',
  },
  contact: {
    key: 'contact',
    title: '聯絡我們｜EDN Project',
    description: 'EDN Project 聯絡資訊與表單頁。',
  },
};

function htmlEjsPlugin() {
  return {
    name: 'edn-html-ejs-transform',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const filename = ctx.filename || 'index.html';
        const pageKey = path.basename(filename, '.html');
        const page = pages[pageKey] || pages.index;

        return ejs.render(
          html,
          {
            site,
            page,
            navItems,
          },
          {
            filename,
          },
        );
      },
    },
  };
}

export default defineConfig(({ command }) => ({
  // GitHub Pages 專案頁需要 /repo-name/；本機開發維持 /
  base: command === 'build' ? `/${repoName}/` : '/',
  plugins: [htmlEjsPlugin()],
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about.html'),
        product: path.resolve(__dirname, 'product.html'),
        contact: path.resolve(__dirname, 'contact.html'),
      },
    },
  },
}));

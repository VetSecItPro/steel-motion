import { writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'src/app/*.tsx',
    'src/app/blog/**/*.tsx',
    'src/app/services/**/*.tsx',
    '!src/app/studio/[[...tool]]/page.tsx',
    '!src/app/api',
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace('src/app', '')
              .replace('/page.tsx', '')
              .replace('.tsx', '');
            const route = path === '/index' ? '' : path;
            return `
              <url>
                  <loc>${`https://www.steelmotionllc.com${route}`}</loc>
              </url>
            `;
          })
          .join('')}
    </urlset>
  `;

  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  // eslint-disable-next-line no-sync
  writeFileSync('public/sitemap.xml', formatted);
}

generate();

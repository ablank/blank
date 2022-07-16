import fs from 'node:fs';
import path from 'node:path';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';

import { promises as fsPromises } from 'node:fs';
import { promisify } from 'node:util';

const writeFile = promisify(fs.writeFile);

const srcdir = path.resolve('src', 'assets');
const distdir = path.resolve('dist', 'assets');
const distImageDir = path.join(distdir, 'images');
const distIconPngDir = path.join(distdir, 'icons', 'png');
const distIconSvgDir = path.join(distdir, 'icons', 'svg');

if (!fs.existsSync(distImageDir)) {
  fs.mkdirSync(distImageDir, { recursive: true });
}
if (!fs.existsSync(distIconPngDir)) {
  fs.mkdirSync(distIconPngDir, { recursive: true });
}
if (!fs.existsSync(distIconSvgDir)) {
  fs.mkdirSync(distIconSvgDir, { recursive: true });
}
(async () => {
  await imagemin([path.resolve(srcdir, 'images', '**/*.{jpg,jpeg,png}')], {
    plugins: [
      imageminJpegtran({
        progressive: true,
      }),
      imageminPngquant({
        speed: 4,
        quality: [0.65, 0.9],
      }),
    ],
  })
    .then((files) => {
      files.forEach(async (v) => {
        const source = path.parse(v.sourcePath);
        v.destinationPath = path.join(distImageDir, source.name + source.ext);
        await fsPromises.mkdir(path.dirname(v.destinationPath), {
          recursive: true,
        });
        await writeFile(v.destinationPath, v.data);
      });
    })
    .catch((e) => {
      console.error(e);
    });
})();

(async () => {
  // await imagemin([path.join(srcdir, 'icons', 'svg') + '**/*.svg']), {
  await imagemin([path.resolve(srcdir, 'icons', 'svg', '**/*.svg')], {
    destination: distIconSvgDir,
    plugins: [
      imageminSvgo({
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
        ],
      }),
    ],
  }).catch((e) => {
    console.error(e);
  });

  console.log('Icons optimized');
})();

import fs from 'node:fs';
import path, { dirname } from 'node:path';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';

import { promises as fsPromises } from 'node:fs';
import { promisify } from 'node:util';

const writeFile = promisify(fs.writeFile);

const dist = {};
dist.srcdir = path.resolve('src', 'assets');
dist.distdir = path.resolve('dist', 'assets');
dist.images = path.join(dist.distdir, 'images');
dist.iconsPng = path.join(dist.distdir, 'icons', 'png');
dist.iconsSvg = path.join(dist.distdir, 'icons', 'svg');

const makeDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const createDirs= [
  dist.images,
  dist.iconsPng,
  dist.iconsSvg
].forEach(element => {
  makeDir(element);
});

(async () => {
  await imagemin([path.resolve(dist.srcdir, 'images', '**/*.{jpg,jpeg,png}')], {
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
      files.forEach(async (f) => {
        const source = path.parse(f.sourcePath);
        console.log(`Optimizing ${source.name + source.ext}`);
        f.destinationPath = path.join(dist.images, source.name + source.ext);
        await fsPromises.mkdir(path.dirname(f.destinationPath), {
          recursive: true,
        });
        await writeFile(f.destinationPath, f.data);
      });
    })
    .catch((e) => {
      console.error(e);
    });
})();

(async () => {
  await imagemin([path.resolve(dist.srcdir, 'icons', 'svg', '**/*.svg')], {
    destination: dist.iconsSvg,
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
  })
  .catch((e) => {
    console.error(e);
  });

})();

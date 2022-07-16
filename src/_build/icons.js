const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcdir = path.resolve(__dirname, '..', 'assets');
const distdir = path.resolve(__dirname, '..', '..', 'dist', 'assets');
const distIconPngDir = path.join(distdir, 'icons', 'png');
const distFaviconDir = path.join(distdir, 'favicons');

if (!fs.existsSync(distIconPngDir)) {
  fs.mkdirSync(distIconPngDir, { recursive: true });
}
if (!fs.existsSync(distFaviconDir)) {
  fs.mkdirSync(distFaviconDir, { recursive: true });
}

const err = (error) => {
  console.error(error);
};

const createDir = (pathname) => {
  try {
    fs.mkdirSync(pathname, (e) => {
      if (e) {
        err(e);
      } else {
        console.log(`\n Creating directory: ${pathname}\n`);
      }
    });
  } catch (e) {
    err(e);
  }
};

const processIcon = async (imagepath, name) => {
  const destination = path.join(distdir, 'icons', 'png');

  if (!fs.existsSync(destination)) {
    createDir(destination);
  }

  process.chdir(destination);

  try {
    await sharp(path.resolve(imagepath, name))
      .png()
      .toFile(path.resolve(destination, name.replace(/.svg/, '.png')))
      .finally((data) => {
        console.log(`${name.replace(/.svg/, '.png')} created`);
      });
  } catch (e) {
    err(e);
  }
};

// Process favicon
(() => {
  const src = path.join(srcdir, 'favicons', 'favicon.svg');
  const apple = [57, 72, 114, 144];
  const favicon = [16, 32];
  const pngOpts = {};

  apple.map((size) => {
    sharp(src)
      .resize(size)
      .png(pngOpts)
      .toFile(path.join(distFaviconDir, `apple-touch-icon-${size}.png`))
      .catch((e) => err(e));

    return;
});

favicon.map((size) => {
  sharp(src)
    .resize(size)
    .png(pngOpts)
    .toFile(path.join(distFaviconDir, `favicon-${size}.png`))
    .catch((e) => err(e));

    return;
});

sharp(src)
  .resize(16)
  .png(pngOpts)
  .toFile(path.join(distFaviconDir, 'favicon.ico'))
  .catch((e) => err(e));

console.log('\nfavicons created\n');
}) ();

// Process icons
(() => {
  const src = path.join(srcdir, 'icons', 'svg');

  fs.readdir(src, (e, files) => {
    files.forEach((svg) => {
      processIcon(src, svg);
    });
  });
})();

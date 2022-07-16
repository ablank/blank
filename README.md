# blank

A seed project for developing with NodeJS.

- Compile sass to css

- Minify css

- Beautify & minify js

- Create png icons/favicons from svg source

- Optimize images

Git this repo and `npm install` to run the initial build, then `npm run` any the following commands:

- `build`: Remove all /dist files and regenerate all files from /src
- `build:style-dictionary`: Regenerate style-dictionary{.json,.scss,.yml} files from /src/style-dictionary
- `build:css`: Remove all /dist/css files and regenerate files from /src/css
- `build:js`: Remove all /dist/js files and regenerate files from /src/js
- `build:assets`: Remove all /dist/assets files and regenerate files from /src/assets
- `clean:assets`: Remove all /dist/assets files
- `clean:css`: Remove all /dist/css files
- `clean:js`: Remove all /dist/js files
- `clean`: Remove all /dist files
- `postcss`: Optimize css files in /dist/css with postcss
- `sass`: Compile sass files from src/sass to dist/css
- `js:beautify`: Copy & beautify top level js files from src/js to dist/js
- `js:uglify`: Minify js files in dist/js
- `icons`: Generate optimized icons and favicons in dist/assets/ from svg files in src/assets/
- `favicons`: Generate optimized favicon files in dist/assets/favicon using src/assets/favicons
- `lint:js`: Lint src/js
- `lint:sass`: Lint src/sass
- `lint:css`: Lint dist/css
- `watch:sass`: Watch src/sass for changes
- `watch:js`: Watch src/js for changes
- `watch:images`: Watch src/assets/images and src/assets/icons for changes
- `watch`: Watch for src/{js,sass,images} changes

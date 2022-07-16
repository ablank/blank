#blank

A seed project for developing with NodeJS.

- Compile sass to css

- Minify css

- Beautify & minify js

- Create png icons/favicons from svg source

- Optimize images

Git this repo and `npm install` to run the initial build, then `npm run` any the following commands:
- `build`: clean all /dist files and regenerate assets from /src

-clean:assets": "rimraf dist/assets",
    "clean:css": "rimraf dist/css",
    "clean:js": "rimraf dist/js",
    "clean": "rimraf dist/**/*",
    "postcss": "node src/_build/postcss.js --trace-warnings ...",
    "sass": "sass src/sass:dist/css --no-source-map",
    "js:beautify": "copyfiles -f [src/js/*.js, !**/*.min.js] dist/js && prettier --config ./src/_build/.prettierrc.json --write ./dist/js/**/*",
    "js:uglify": "uglifyjs-folder dist/js -eo dist/js",
    "icons": "node src/_build/icons.js",
    "favicons": "imagemin src/assets/favicons/ -o dist/assets/favicons",
    "lint:js": "eslint -c 'src/_build/.eslintrc.json' 'src/js' --fix; exit 0",
    "lint:css": "stylelint 'dist/css/' --config './src/_build/.stylelintrc.json' --fix; exit 0",
    "lint:sass": "stylelint 'src/sass/' --config './src/_build/.sasslintrc.json'; exit 0",
    "build:style-dictionary": "node src/_build/style-dictionary.js",
    "build:css": "run-s clean:css sass postcss",
    "build:js": "run-s clean:js js:*",
    "build:assets": "run-s clean:assets && node src/_build/imagemin.mjs && run-p favicons icons",
    "": "run-s build:* lint:*",
    "watch:sass": "onchange \"src/sass\" -- run-s sass",
    "watch:js": "onchange \"src/js\" -- run-s js:beautify",
    "watch:images": "onchange \"src/assets/images\" -- run-s build:images || onchange \"src/assets/icons\" -- run-s build:icons",
    "watch": "run-p watch:*",

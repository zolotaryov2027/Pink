import gulp from 'gulp';

import {deleteAsync} from 'del';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import imagemin from 'gulp-imagemin';
import sprite  from 'gulp-svg-sprite';
import svgmin  from 'gulp-svgmin';
import cheerio   from 'gulp-cheerio';
import replace   from 'gulp-replace';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import gcmq from 'gulp-group-css-media-queries';
import autoprefixer from 'gulp-autoprefixer';
import webpack  from 'webpack-stream';

import sync from 'browser-sync';




const paths =  {
  html: {
    src: 'src/**/*.html',
    dest: 'dist/'
  },
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  image: {
    src: 'src/img/**/*.{png,jpg,jpeg,webp,svg,ico}',
    dest: 'dist/img/'
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'dist/fonts/'
  },
  svg: {
    src: 'src/img/svgSprites/**/*.svg',
    dest: 'dist/img/'
  },
}



//svg sprite
export const svgSprites = () => {
  return gulp.src(paths.svg.src)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        },
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(sprite({
      mode: {
        stack: {
          sprite: "../icons/sprite.svg"
        }
      },
    }))
    .pipe(gulp.dest(paths.svg.dest));
}







export const clean = () => {
  return deleteAsync(['dist']);
}

export const html = () => {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(sync.stream());
}


export const styles = () => {
  return gulp.src(paths.styles.src, {sourcemaps: true})
    .pipe(sass())
    .pipe(gcmq())
    .pipe(autoprefixer({
			cascade: false
		}))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(sync.stream());
}

export const scripts = () => {
  return gulp.src(paths.scripts.src, {sourcemaps: true})
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'main.js',
      }
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(sync.stream());
}

export const images = () => {
  return gulp.src(paths.image.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.image.dest))
    .pipe(sync.stream());
}

export const fonts = () => {
   gulp.src(paths.fonts.src)
    .pipe(ttf2woff())
    .pipe(gulp.dest(paths.fonts.dest))
  return gulp.src(paths.fonts.src)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(sync.stream()); 
}



export const server = () => {
    sync.init({
      ui: false,
      notify: false,
      server: {
          baseDir: "./dist"
      }
  });
}


export const watchFiles = () => {
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.image.src, images);
  gulp.watch(paths.fonts.src, fonts);
}





export default gulp.series(clean, gulp.parallel(html, styles, scripts, images, fonts), gulp.parallel(watchFiles, server));
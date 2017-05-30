const gulp      = require('gulp'),
  concat     = require('gulp-concat'),
  rename     = require('gulp-rename'),
  minifyCSS  = require('gulp-minify-css'),
  uglify     = require('gulp-uglify'),
  data       = require('gulp-data'),
  header     = require('gulp-header'),
  sourcemaps = require('gulp-sourcemaps'),
  stylus     = require('gulp-stylus'),
  nib        = require('nib'),
  jeet       = require('jeet'),
  path       = require('path'),
  plumber    = require('gulp-plumber'),
  argv       = require('yargs').argv,
  babel      = require('babelify'),
  browserify = require('browserify'),
  watchify   = require('watchify'),
  source = require('vinyl-source-stream');

//data
const pkg   = require('./frontend.json'),
      debug = argv.debug;


//Rutas
const routes = {
  app: path.join(__dirname, 'public/'),
  src: path.join(__dirname, 'src/'),
  css: 'css/',
  stylus: 'stylus/',
  views: 'views/',
  templates: 'templates/',
  js: 'js/',
  coffee: 'coffee/'
};

/**Routes

  routes.app + routes.js = 'publication/js/'
  routes.src + routes.coffee = 'src/coffee/'
  routes.app + routes.css = 'publication/css/'
  routes.src + routes.stylus = 'src/stylus/'
  routes.src + routes.views = 'src/views/'
  routes.src + routes.templates = 'src/templates/'

**/


const banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @link <%= pkg.author.name %> - <%= pkg.author.email %>',
  ' * @license <%= pkg.license %>',
  ' *<%= new Date() %>',
  ' */',
  ''
].join('\n');


const baseDir = (debug)?'':routes.app;
//arreglo concatenar JS en el orden en el que se cargan
const jsLibs = [
  baseDir + routes.js +'libs/jquery.js',
];

//Tarea para comprimir las libreriras JS
gulp.task('libs',  () =>{
     return gulp.src(jsLibs)
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(plumber())
        .pipe(concat('concat.libs.js'))
        .pipe(gulp.dest(routes.app + routes.js))
        .pipe(rename('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(routes.app + routes.js));
});


//tarea para compilar stylus
gulp.task('css',  () =>{
  return gulp.src(routes.src + routes.stylus + 'main.styl')
  .pipe(header(banner, { pkg : pkg } ))
  .pipe(plumber())
  .pipe(sourcemaps.init()) //cargamos tarea de sourcemaps
  .pipe(stylus({ //iniciamos stylus
    use: [
      nib(),
      jeet()

    ], // cargamos nib para uso de css3
    compress: false
  }))
  // .on('error', onError)
  .pipe(rename('style.css')) //renombramos el archivo
  .pipe(gulp.dest(routes.app + routes.css)) // destino del archivo
  .pipe(sourcemaps.write('../maps')) //creamos sourcemap aparte
  .pipe(gulp.dest(routes.app + routes.css))
  // .pipe(browserSync.reload({
  //     stream: true
  //   }))

});


//Funcion para recargar el bundle en watch
compileJS = (debug) =>{
  let bundle = browserify(routes.src + 'app/index.js', {debug:true});

  if(debug){
    bundle = watchify(bundle);
    bundle.on('update',  () =>{
      console.log(':::::::::BUILD:::::::::');
      rebundle();

      });
  }


  rebundle = ()=>{
    bundle
    .transform(babel,{presets:['es2015']})
    .bundle()
    // .plumber()
    .on('error', function (err) { console.log(err); this.emit('end') })
    .pipe(source('index.js'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(routes.app+ routes.js));

  };

  rebundle();

}


//Concatenar y minificar CSS
gulp.task('minicss',  () =>{
  return gulp.src([routes.app + routes.css + '**/*.css', '!'+routes.app + routes.css +'/**/'+pkg.name+'.min.css'])
  .pipe(concat(pkg.name +'.min.css'))
  // .pipe(purify([ routes.src + '/**/*.**'],
  //   {info:true} ))
  .pipe(minifyCSS())
  .pipe(gulp.dest(routes.app + routes.css))

});

gulp.task('build', () =>{
  return compileJS(debug);

});


//tarea que observa cambios para recargar el navegador
gulp.task('watch', ['css'],  () =>{

  gulp.watch( routes.src + routes.stylus +'**/*.styl',{cwd:'./'} , ['css']); //Stylus
  gulp.watch('public/js/**/*.js');
  gulp.watch(routes.app + 'images/**/*.{gif,svg,jpg,png}', {cwd:'./'}); //Images
  gulp.watch(routes.app + 'fonts/**/*.{svg,eot,ttf,woff,woff2}',{cwd:'./'}); //Fonts
  return compileJS(debug);

});

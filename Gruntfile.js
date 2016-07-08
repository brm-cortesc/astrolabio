'use strict';
/*Indica a grunt que es un archivo que contiene tareas a ejecutar*/
module.exports = function(grunt) {

	 var debug;
	 debug = !!grunt.option('debug');
	 //cargamos todas las dependecias del package.json//
	 require('load-grunt-tasks')(grunt);

	//Se inicia la configuración del projecto
		grunt.initConfig({
		//Le indica cuales archivos de configuracion se van a leer
		pkg: grunt.file.readJSON('astrolabio.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Inicio de la configuración de las tareas, concurrent permite correr procesos en paralelo
		concurrent:{
			dev:{
				tasks: ['nodemon', ['browserSync', 'watch']],
				options:{
			      logConcurrentOutput: true

				}
			}

		},
		//Tarea que se utiliza para limpiar los archivos temporales que se crean al momento de minificar o combinar archivos
		clean: {
			files: ['dist']
		},
		//Concatena archivos css o js en un solo archivo
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['public/js/libs/jquery.js', 'public/js/libs/bootstrap.min.js', 'public/js/libs/jquery.validate.js'],
				dest: 'public/js/concat.<%= pkg.name %>.js'
			},
		},
		//Minifica librerias js (jquery,bootstrap, etc)
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'public/js/libs.<%= pkg.name %>.min.js'
			},
		},
		//Se utiliza para revisar el código js
		qunit: {
			files: ['test/**/*.html','public/js/*.js']
		},	
		// Minifica y combina el código css
		cssmin: {
		      combine: {
		      files: {
		        'public/css/<%= pkg.name %>.min.css': ['public/css/*.*', "!public/css/<%= pkg.name %>.min.css"]
		      }
		    }
		  },


		//Se usa para reiniciar automaticamente el navegador al momento de modificar algún archivo *leer reload.txt*
		browserSync: {
					dev: {
							bsFiles: {
									src : ['public/**/*.*','public/*.*', 'views/*.*']
							},
							options: {
									watchTask: true, // < VERY important, so much wow
									injectChanges: true,
									proxy: 'http://localhost:5000',
									port: 5001, // our new port
									open: true
							}
					}
			},
				//Se utiliza para ejecutar comandos de consola desde el archivo
		shell: {
		
		stylus:{
			command: 'stylus -u nib -u jeet --sourcemap src/stylus/main.styl --out public/css/style.css ',
			options: {
					stdout: true,
					stderr: true
			}

		}

	
		},
		nodemon: {
		  dev: {
		    script: 'server.js'
		  }
		},

		//Generador de archivos/directorio para BackboneJS
		generate:{
			options:{
				dest: 'public/js',
				map:{
					'backbone/View': 'views',
					'backbone/Model': 'models',
					'backbone/Router': 'routers',
					'backbone/Collection': 'collections'
				}

			}

		},

		/*Mantiene una tarea que observa los archivos y ejecuta tareas atumaticamente al momento de detectar cambios, solo se observan los archivos de los preprocesadores para evitar loops.*/
		watch: {
			brm: {
				
				files: ['src/**/**.pug',
						'src/*.pug',
						'src/**/**.styl',
						'src/*.styl',
						'public/*.js',
						'public/**/**.js',
						'public/images/**.*'
						],

				tasks : ["cssmin", "shell:stylus"],/*las tareas que se corren por defecto al observar cambios en los archivos*/
				task : ['shell:stats']
			}
		},
	});
// Fin de la configuración de las tareas

	// Se especifican los plugins que se van a utilizar

	// Se programan las tareas a ejecuar al momento de llamar "grunt %nombretarea%".
	grunt.registerTask('minicss', ['cssmin','clean']);
	grunt.registerTask('minijs', ['concat','uglify','clean']);
	grunt.registerTask('csstylus', ['stylus']);
	// grunt.registerTask('template', ['pug']);
	grunt.registerTask('depurar', ['jshint']);
	grunt.registerTask('observer', ['nodemon']);

	grunt.registerTask('default', ['concurrent']); 
};
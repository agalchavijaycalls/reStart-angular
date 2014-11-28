module.exports = function(grunt) {
	// Matchdep plugin
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/assets/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/assets/img/'
				}]
			}
		},
		concat: {
			dist: {
				src: ['src/app/core/App.js', 'src/app/core/constants/*.js', 'src/app/core/services/*.js', 'src/app/core/factories/*.js', 'src/app/core/controllers/*.js', 'src/app/ui/**/*.js'],
				dest: 'dist/app/ng-<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			dist: {
				files: {
					'dist/app/ng-<%= pkg.name %>.min.js': ['dist/app/ng-<%= pkg.name %>.js'],
					'dist/assets/js/libs/modernizr.min.js': ['src/assets/js/libs/modernizr.js'],
					'dist/assets/js/libs/libs.min.js': ['src/assets/js/libs/**/*.js', '!src/assets/js/libs/modernizr.js'],
					'dist/assets/js/<%= pkg.name %>.min.js': ['src/assets/js/**/*.js', '!src/assets/js/libs/*']
				}
			}
		},
		sass: {
			dev: {
				options: {
					style: 'expanded',
					lineNumbers: true
				},
				files: {
					'src/assets/css/<%= pkg.name %>.css': 'src/assets/css/scss/styles.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'dist/assets/css/<%= pkg.name %>.min.css': 'src/assets/css/scss/styles.scss'
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			css: {
				files:  ['**/*.scss'],
				tasks: ['sass:dev']
			}
		}
	});
	
	// Default task(s)
	grunt.registerTask('default', ['sass:dev', 'watch']);
	grunt.registerTask('production', ['imagemin', 'concat', 'uglify', 'sass:dist']);

};
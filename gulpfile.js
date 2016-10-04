var gulp = require('gulp')
    , nodemon = require('gulp-nodemon');

gulp.task('watch', function() {
    var stream = nodemon({ script: 'app.js'
        , ext: 'html js ejs'
        , ignore: ['public/']});

    stream
        .on('restart', function () {
            console.log('Server restart.')
        })
        .on('crash', function() {
            console.error('Server crash.\n')
                stream.emit('restart', 5)
        });
});


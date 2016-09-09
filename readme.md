# mkdir-bluebird
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![NSP Status][nsp-image]][nsp-url]

wraps node’s [`fs.mkdir()`][fs-mkdir], in a [bluebird ( v3.4.6 )][bluebird] promise that resolves with `true` if successful or rejects with the `Error` returned by `fs.mkdir()`; both results need to be handled by the code calling this function.

## installation
```javascript
npm install mkdir-bluebird
```

## usage
### mkdir( path[, mode][, ignore] )
```javascript
@param {string|buffer} path
@param {number} [mode = 0o777]
@param {boolean} [ignore = true] ignore `EEXIST` directory errors returned by `fs.mkdir()`
@returns {Promise}
```

### default
ignores `EEXIST` directory errors returned by `fs.mkdir()`
```javascript
var mkdir = require( 'mkdir-bluebird' );

mkdir( 'test-dir' )
  .then(
    function( result ) {
      // handle success
    }
  )
  .catch(
    function( err ) {
      // handle error
    }
  )
```

### set ignore to `false`
acknowledges `EEXIST` directory errors returned by `fs.mkdir()`
```javascript
var mkdir = require( 'mkdir-bluebird' );

mkdir( 'test-dir', null, false )
  .then(
    function( result ) {
      // handle success
    }
  )
  .catch(
    function( err ) {
      // handle error
    }
  )
```

### using node’s path module
the path `__dirname/test` must exist in order to create the directory `test-dir` in it
```javascript
var mkdir = require( 'mkdir-bluebird' );
var path = require( 'path' );
var dirpath = path.join( __dirname, 'test', 'test-dir' );

mkdir( dirpath )
  .then(
    function( result ) {
      // handle success
    }
  )
  .catch(
    function( err ) {
      // handle error
    }
  )
```

## license
[MIT License][mit-license]

[coveralls-image]: https://coveralls.io/repos/github/dan-nl/mkdir-bluebird/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/dan-nl/mkdir-bluebird?branch=master
[bluebird]: https://www.npmjs.com/package/bluebird
[fs-mkdir]: https://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback
[mit-license]: https://raw.githubusercontent.com/dan-nl/mkdir-bluebird/master/license.txt
[npm-image]: https://img.shields.io/npm/v/mkdir-bluebird.svg
[npm-url]: https://www.npmjs.com/package/mkdir-bluebird
[nsp-image]: https://nodesecurity.io/orgs/githubdan-nl/projects/2d73966e-ed83-47a7-bf79-37c6aca36be0/badge
[nsp-url]: https://nodesecurity.io/orgs/githubdan-nl/projects/2d73966e-ed83-47a7-bf79-37c6aca36be0
[travis-image]: https://travis-ci.org/dan-nl/mkdir-bluebird.svg?branch=master
[travis-url]: https://travis-ci.org/dan-nl/mkdir-bluebird

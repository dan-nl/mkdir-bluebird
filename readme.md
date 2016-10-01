# mkdir-bluebird
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][david-dm-image]][david-dm-url] [![NSP Status][nsp-image]][nsp-url]

promise wrapper for node’s fs.mkdir() that ignores `EEXIST` by default.

wraps node’s [`fs.mkdir()`][fs-mkdir], in a [bluebird][bluebird] promise that resolves with `true` if successful or rejects with the `Error` returned by `fs.mkdir()`; both results need to be handled by the code calling this function.

## table of contents
* [installation](#installation)
* [usage](#usage)
    * [mkdir( path[, mode][, ignore] )](#mkdir-path-mode-ignore-)
    * [default](#default)
    * [set ignore to false](#set-ignore-to-false)
    * [using node’s path module](#using-nodes-path-module)
* [license](#license)

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
    /**
     * @param {boolean} result
     */
    function( result ) {
      // handle success
    }
  )
  .catch(
    /**
     * @param {Error} err
     */
    function( err ) {
      // handle error
    }
  );
```

### set ignore to `false`
acknowledges `EEXIST` directory errors returned by `fs.mkdir()`
```javascript
var mkdir = require( 'mkdir-bluebird' );

mkdir( 'test-dir', null, false )
  .then(
    /**
     * @param {boolean} result
     */
    function( result ) {
      // handle success
    }
  )
  .catch(
    /**
     * @param {Error} err
     */
    function( err ) {
      // handle error
    }
  );
```

### using node’s path module
the path `__dirname/test` must exist in order to create the directory `test-dir` in it
```javascript
var mkdir = require( 'mkdir-bluebird' );
var path = require( 'path' );
var dirpath = path.join( __dirname, 'test', 'test-dir' );

mkdir( dirpath )
  .then(
    /**
     * @param {boolean} result
     */
    function( result ) {
      // handle success
    }
  )
  .catch(
    /**
     * @param {Error} err
     */
    function( err ) {
      // handle error
    }
  );
```

## license
[MIT License][mit-license]

[coveralls-image]: https://coveralls.io/repos/github/dan-nl/mkdir-bluebird/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/dan-nl/mkdir-bluebird?branch=master
[david-dm-image]: https://david-dm.org/dan-nl/mkdir-bluebird.svg
[david-dm-url]: https://david-dm.org/dan-nl/mkdir-bluebird
[bluebird]: https://www.npmjs.com/package/bluebird
[fs-mkdir]: https://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback
[mit-license]: https://raw.githubusercontent.com/dan-nl/mkdir-bluebird/master/license.txt
[npm-image]: https://img.shields.io/npm/v/mkdir-bluebird.svg
[npm-url]: https://www.npmjs.com/package/mkdir-bluebird
[nsp-image]: https://nodesecurity.io/orgs/githubdan-nl/projects/159c1d65-8122-4061-8a2b-deda0739ceab/badge
[nsp-url]: https://nodesecurity.io/orgs/githubdan-nl/projects/159c1d65-8122-4061-8a2b-deda0739ceab
[travis-image]: https://travis-ci.org/dan-nl/mkdir-bluebird.svg?branch=master
[travis-url]: https://travis-ci.org/dan-nl/mkdir-bluebird

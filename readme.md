# mkdir( path[, mode][, ignore] )
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

wraps node’s [`fs.mkdir()`][1], in a [bluebird ( v3.4.6 )][2] promise that resolves with `true` if successful or rejects with the `Error` returned by `fs.mkdir()`; both results need to be handled by the code calling this module. 

```javascript
@param {String|Buffer} path
@param {Number} [mode = 0o777]
@param {boolean} [ignore = true] ignore `EEXIST` directory errors returned by `fs.mkdir()`

@returns {Promise}
```

## installation
```javascript
npm install mkdir-bluebird
```

## usage
### basic
ignores `EEXIST` directory errors returned by `fs.mkdir()`; all other errors still reject the promise
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
acknowledges `EEXIST` directory errors returned by `fs.mkdir()` and rejects the promise if that error occurs
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

## license
[MIT License][3]

[1]: https://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback
[2]: https://www.npmjs.com/package/bluebird
[3]: https://raw.githubusercontent.com/dan-nl/mkdir-bluebird/master/license.txt
[travis-image]: https://travis-ci.org/dan-nl/mkdir-bluebird.svg?branch=master
[travis-url]: https://travis-ci.org/dan-nl/mkdir-bluebird
[coveralls-image]: https://coveralls.io/repos/github/dan-nl/mkdir-bluebird/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/dan-nl/mkdir-bluebird?branch=master
[npm-image]: https://img.shields.io/npm/v/mkdir-bluebird.svg
[npm-url]: https://www.npmjs.com/package/mkdir-bluebird
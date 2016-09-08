'use strict';

/**
 * module dependencies
 */
var fs = require( 'fs' );
var Bluebird = require( 'bluebird' );

/**
 * wraps node’s `fs.mkdir()`, in a bluebird ( v 3.4.6 ) promise that resolves with `true` if successful or rejects with
 * the `Error` returned by `fs.mkdir()`; both results need to be handled by the code calling this module
 *
 * note: `fs.mkdir()` throws a `TypeError` if the params passed to it are not valid, and returns an `Error` to the
 * callback if it cannot create the directory
 *
 * @param {String|Buffer} path
 * @param {Number} [mode = 0o777]
 * @param {boolean} [ignore = true] ignore `EEXIST` directory errors returned by `fs.mkdir()`
 *
 * @returns {bluebird}
 */
module.exports = function mkdir( path, mode, ignore ) {
  ignore = typeof ignore === 'boolean'
    ? ignore
    : true;

  return new Bluebird(
    /**
     * @param {Function} resolve
     * @param {Function} reject
     */
    function ( resolve, reject ) {
      try {
        fs.mkdir(
          path,
          mode,
          /**
           * @param {Error} [err]
           */
          function callback( err ) {
            if ( err ) {
              if ( err.code === 'EEXIST' && ignore ) {
                resolve( true );
                return;
              }

              reject( err );
              return;
            }

            resolve( true );
          }
        );
      } catch ( err ) {
        reject( err );
      }
    }
  );
};

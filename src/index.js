'use strict';

/**
 * module dependencies
 */
var fs = require( 'fs' );
var Promise = require( 'bluebird' );

/**
 * wraps node’s `fs.mkdir()`, in a bluebird ( v 3.4.6 ) promise that resolves with `true` if
 * successful or rejects with the `Error` returned by `fs.mkdir()`; both results need to be
 * handled by the code calling this module
 *
 * @param {string|buffer} path
 * @param {number} [mode = 0o777]
 * @param {boolean} [ignore = true] ignore `EEXIST` directory errors returned by `fs.mkdir()`
 *
 * @returns {Promise}
 */
module.exports = function mkdir( path, mode, ignore ) {
  ignore = typeof ignore === 'boolean'
    ? ignore
    : true;

  return new Promise(
    /**
     * @param {Function} resolve
     * @param {Function} reject
     */
    function ( resolve, reject ) {
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
    }
  );
};

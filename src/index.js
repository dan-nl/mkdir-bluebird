'use strict';

/**
 * module dependencies
 */
var fs = require( 'fs' );
var Promise = require( 'bluebird' );

/**
 * promise wrapper for node’s fs.mkdir() that ignores EEXIST by default
 *
 * wraps node’s fs.mkdir(), in a bluebird promise that resolves with `true` if
 * successful or rejects with the `Error` returned by fs.mkdir(); both results need to be
 * handled by the code calling this module
 *
 * @param {string|buffer} path
 * @param {number} [mode = 0o777]
 * @param {boolean} [ignore = true] ignore `EEXIST` directory errors returned by `fs.mkdir()`
 *
 * @returns {Promise.<boolean, Error>}
 */
module.exports = function mkdir( path, mode, ignore ) {
  ignore = typeof ignore === 'boolean'
    ? ignore
    : true;

  return new Promise(
    /**
     * @param {Function} resolve
     * @param {Function} reject
     * @returns {undefined}
     */
    function ( resolve, reject ) {
      fs.mkdir(
        path,
        mode,
        /**
         * @param {Error} [err]
         * @returns {undefined}
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

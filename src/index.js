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

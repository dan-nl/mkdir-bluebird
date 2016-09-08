/* globals describe, beforeEach, it */
'use strict';

/**
 * module dependencies
 */
var bluebird = require( 'bluebird' );
var chai = require( 'chai' );
var chaiAsPromised = require( 'chai-as-promised' );
var expect = chai.expect;
var fs = require( 'fs' );
var mkdir = require( '../' );

/**
 * module variables
 */
var dirname = 'test-temp';

/**
 * module plugins
 */
chai.use( chaiAsPromised );

describe( 'mkdir( path[, mode] )', function () {
  describe( 'should return', function () {
    beforeEach(
      function () {
        fs.rmdir( dirname );
      }
    );

    it( 'a bluebird promise', function () {
      expect( mkdir( dirname ) ).to.be.instanceof( bluebird );
    } );
  } );

  describe( 'should resolve', function () {
    beforeEach(
      function () {
        fs.rmdir( dirname );
      }
    );

    it( 'with `true` when the directory is created successfully', function () {
      return expect( mkdir( dirname ) ).to.eventually.equal( true );
    } );

    it( 'with `true` when `ignore` is set to `true` and the directory already exists', function () {
      return expect( mkdir( 'node_modules' ) ).to.eventually.equal( true );
    } );
  } );

  describe( 'should reject with', function () {
    it( 'a `TypeError` when `path` is not a string', function () {
      return expect( mkdir() ).to.be.rejectedWith( TypeError, 'path must be a string' );
    } );

    it( 'a `TypeError` when `mode` is not an integer', function () {
      return expect( mkdir( dirname, 'x' ) ).to.be.rejectedWith( TypeError, 'mode must be an integer' );
    } );

    it( 'an `Error` when `ignore` is set to `false` and the directory already exists', function () {
      return expect( mkdir( 'node_modules', null, false ) ).to.be.rejectedWith( Error, 'EEXIST' );
    } );
  } );
} );

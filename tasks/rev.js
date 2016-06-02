/*
 * grunt-rev
 * https://github.com/cbas/grunt-rev
 *
 * Copyright (c) 2013 Sebastiaan Deckers
 * Licensed under the MIT license.
 */

'use strict';

let fs = require('fs'),
  path = require('path'),
  crypto = require('crypto');

module.exports = (grunt) => {

  let md5 = (filepath, algorithm, encoding, fileEncoding) => {
    let hash = crypto.createHash(algorithm);
    grunt.log.verbose.write(`Hashing ${filepath}...`);
    hash.update(grunt.file.read(filepath), fileEncoding);
    return hash.digest(encoding);
  }

  grunt.registerMultiTask('rev', 'Prefix static asset file names with a content hash', function() {

    let options = this.options({
      encoding: 'utf8',
      algorithm: 'md5',
      length: 8,
      onComplete() {
        //one arg eg: [ [ source_file_path, dist_file_path ], ... ]
      },
      onStep() {
        //two args eg: source_file_path, dist_file_path

      }
    });
    let revFiles = [];

    this.files.forEach((filePair) => {
      filePair.src.forEach((f) => {

        let hash = md5(f, options.algorithm, 'hex', options.encoding),
          prefix = hash.slice(0, options.length),
          renamed = [prefix, path.basename(f)].join('.'),
          outPath = path.resolve(path.dirname(f), renamed);

        let current = [f, f.substring(0, f.lastIndexOf(path.basename(f))) + renamed];
        revFiles.push(current);
        options.onStep(...current);

        grunt.verbose.ok().ok(hash);
        fs.renameSync(f, outPath);
        grunt.log.write(f + ' ').ok(renamed);

      });
    });
    options.onComplete(revFiles);
  });

};
const fs = require('fs'), path = require('path');
const DIR_TYPE = '_dir', FILE_TYPE = '_file';
const easyzip = require('easyzip');
const readir = require('./packages/readir')
const mkdir = require('./packages/mkdirlist')
exports.readir = readir;
exports.mkdir = mkdir;

function rmdir(p) {
  p = path.resolve(p);
  var files = readir(p);
  if (files.length > 0) {
    files.forEach(file => {
      if (file.type === DIR_TYPE) {
        rmdir(file.path)
      }
      if (file.type === FILE_TYPE) {
        fs.unlinkSync(file.path)
      }
    })
  }
  fs.rmdirSync(p)
}
exports.rmdir = rmdir;

function zipdir(p, z) {
  return easyzip.dirzipAsync(p, z);
}
exports.zipdir = zipdir;

exports.TYPE = {
  DIR_TYPE: DIR_TYPE,
  FILE_TYPE: FILE_TYPE
}
const fs = require('fs'), path = require('path');
const Promise = require('promise'), co = require('co');
const DIR_TYPE = '_dir', FILE_TYPE = '_file';
const easyzip = require('easyzip');
const READ_OPT_DEFAULT = { deep: true, exclude: [] };

function readir(dirpath, opt) {
  if (!opt) opt = {};
  opt = Object.assign(READ_OPT_DEFAULT, opt);
  let _all = fs.readdirSync(dirpath)
  let files = [];
  _all.forEach(_name => {
    if ((opt.exclude.indexOf(_name)) < 0) {
      let f = { name: _name, type: FILE_TYPE, path: dirpath + path.sep + _name };
      let stat = fs.statSync(f.path);
      if (stat.isDirectory()) {
        f.type = DIR_TYPE;
        if (opt.deep) {
          let child_files = readir(f.path, opt);
          f.files = child_files;
          f.count = child_files.length;
        } else {
          let tmp = fs.readdirSync(f.path);
          f.count = tmp.length;
        }
      } else {
        f.size = stat.size;
      }
      files.push(f);
    }
  })
  return files;
}

exports.readir = readir;

function mkdir(p) {
  p = path.resolve(p);
  try {
    fs.mkdirSync(p, 0777);
  } catch (err0) {
    switch (err0.code) {
      case 'ENOENT':
        made = mkdir(path.dirname(p));
        mkdir(p);
        break;
      default:
        var stat;
        try {
          stat = fs.statSync(p);
        }
        catch (err1) {
          throw err0;
        }
        if (!stat.isDirectory()) throw err0;
        break;
    }
  }
  return p;
}

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

const fs = require('fs'), path = require('path');
const DIR_TYPE = '_dir', FILE_TYPE = '_file';

function readir(dirpath, opt) {
    dirpath = path.resolve('./', dirpath)
    const READ_OPT_DEFAULT = { deep: true, exclude: [] };
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
exports.read = readir;
exports.TYPE = {
    DIR_TYPE: DIR_TYPE,
    FILE_TYPE: FILE_TYPE
}
const fs = require('fs'), path = require('path');

function mkdir(p) {
    p = path.resolve('./', p);
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
module.exports = mkdir;
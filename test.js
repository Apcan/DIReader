var dirutil = require('./index')

const path = require('path'), fs = require('fs');

dirutil.mkdir(path.resolve('.') + path.sep + "t1" + path.sep + "t2")


dirutil.zipdir(path.resolve('.') + path.sep + "t1").then(zip => {
  console.log('zip:' + zip)
  console.log(dirutil.readir('.', { deep: true, exclude: ['node_modules', '.git'] }));
  setTimeout(() => {
    dirutil.rmdir(path.resolve('.') + path.sep + "t1");
  }, 1 * 1000)
}).catch(err => { })




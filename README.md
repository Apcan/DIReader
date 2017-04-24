# easydir 

### npm i -save easydir 

## API

  - readir
    - dirpath
        - 文件夹路径
    - option
        - 可选参数 
        - {deep:true,exclude:[]}
        - deep:是否获取所有层级的文件和文件夹
        - exclude：排除的文件夹
  - mkdir
    - path:传入需要创建文件夹的路径
  - rmdir
    - path:传入需要删除的文件夹路径
  - zipdir
    - path:传入需要压缩的文件夹路径（linux不支持，windows/mac 支持）
    - zippath:自定义需要储存zip的路径和文件名
    - return 生成的压缩包路径

## Example
  ```javascript
    var dirutil = require('./index');
    const path = require('path'), fs = require('fs');
    dirutil.mkdir(path.resolve('.') + path.sep + "t1" + path.sep + "t2")
    dirutil.zipdir(path.resolve('.') + path.sep + "t1").then(zip => {
      console.log('zip:' + zip)
      console.log(dirutil.readir('.', { deep: true, exclude: ['node_modules', '.git'] }));
    setTimeout(() => {
      dirutil.rmdir(path.resolve('.') + path.sep + "t1");
    }, 1 * 1000)
    }).catch(err => { })
    
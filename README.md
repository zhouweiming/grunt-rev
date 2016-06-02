# grunt-rev

[![Build Status](https://travis-ci.org/cbas/grunt-rev.png)](https://travis-ci.org/cbas/grunt-rev)
[![Project Status: Unsupported - The project has reached a stable, usable state but the author(s) have ceased all work on it. A new maintainer may be desired.](http://www.repostatus.org/badges/latest/unsupported.svg)](http://www.repostatus.org/#unsupported)

```bash
npm install zhowweiming/grunt-rev --save-dev
```

forked from [cbas/grunt-rev](https://github.com/cbas/grunt-rev)，想看原始配置的，可以看这里[cbas/grunt-rev](https://github.com/cbas/grunt-rev)。

仅在原始配置的基础上做了两处修改：

1. 添加了三个配置：`options.basename`、`options.onStep`、`options.onComplete`。
2. 调整了下`package.json`里面的`devDependencies`，以便能跑通`npm test`，方便测试。

### New Options

#### options.basename

Type: `Boolean`

Default value: `true`

最终生成的文件，是否包含原始文件名，默认为`true`，兼容以前，当为`false`时，生成的文件名仅有hash值和后缀名。

#### options.onStep

Type: `Function`

Params: `onStep(source_file_path, dest_file_path)`

在对每个文件执行转换之前，调用该回调方法，参数为源文件路径和目标文件路径。
eg: `"/public/js/main.js", "/public/js/7ec48478.main.js"`

#### options.onStep

Type: `Function`

Params: `onComplete(all_step_files_array)`

在完成所有转换任务时，调用该回调方法，参数为一个数组，包含所有转换过的文件的源路径和目标路径。
eg: `[["/public/js/main.js", "/public/js/7ec48478.main.js"],...]`


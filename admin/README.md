# 起步

```
yarn 装依赖
yarn start 启动
默认占用 8081 端口
技术： node

npm install -g pkg
```

# 简介

1、本项目由 node 编写。

# 打包配置

```
# 推荐版本
node  v16.20.2
pkg   v5.8.1
yarn build 打包
```


### 如果遇到 Not found in remote cache:  {"tag":"v3.4","name":"node-v16.16.0-win-x64"}
这个错，参考这些链接来解决
1、https://www.zztuku.com/detail-13472.html
2、https://juejin.cn/post/7272558903102373924
3、https://github.com/vercel/pkg-fetch/releases


### 参考的缓存地址及文件地址：
C:\Users\Administrator\.pkg-cache\v3.4
fetched-v16.16.0-win-x64

缓存文件的 [下载地址](https://objects.githubusercontent.com/github-production-release-asset-2e65be/65306974/9b569d0e-cb46-4d36-8105-62a2fcb6e614?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=releaseassetproduction%2F20241023%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241023T025851Z&X-Amz-Expires=300&X-Amz-Signature=22b8679f1d60e2ecd4482d51d14c21cbfdbbfa8579326cb5f41be4cdc2278926&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3Dnode-v16.16.0-win-x64&response-content-type=application%2Foctet-stream)


### better-sqlite3 需要安装 node gyp 依赖
已经有Visual Studio 怎么安装 Desktop development with C++
1、如果你安装了 VS2022，可以在 Visual Studio 主界面右上角找到 "Tools" → "Get Tools and Features..."（工具 → 获取工具和功能）。
2、在 "Workloads"（工作负载） 选项卡下，找到 "Desktop development with C++"（C++桌面开发）。
3、点击 "Modify"（修改） 开始安装。

```
备注：
如果要打包，别用es6 的模块化，用了pkg打包不了。
```

## 洁账 - Taro重制版

## 版本依赖
Node 17.9.1
Taro v3.2.0
Taro UI

## 可能遇到的问题
```
1. npm install 阶段出现npm ERR! gyp verb check python checking for Python executable "python2" in the PATH
解决方案：
管理员运行 npm install --global windows-build-tools
可能会遇到卡住的情况，参考 https://developer.huawei.com/consumer/cn/forum/topic/0203740461436730610
2. npm cache clear --force
3. npm install


2. 编译阶段下面报错，antd的报错 
编译  发现页面  src/pages/assets_flow/index.tsx
\ 正在编译...Error: error:0308010C:digital envelope routines::unsupported

解决方案：
修改 package.json
"dev:weapp": "set NODE_OPTIONS=--openssl-legacy-provider && npm run build:weapp -- --watch",

referer: https://github.com/ant-design/ant-design-pro/issues/9272
```
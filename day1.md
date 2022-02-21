# Vue-cli脚手架项目

node + webpack

node_modules文件夹：项目依赖文件

public文件夹：一般放置一些静态资源（一般放置静态资源）。。

## 2.项目的其他配置

* 项目运行起来的时候自动打开浏览器
---package.json

```JSON
"scripts": {
  "serve": "vue-cli-service serve --open chrome",
  "build": "vue-cli-service build"
}
```

* 关闭eslint
vue.config.js

```JSON
module.exports = {
  lintOnSave: false
}
```

* 文件别名

path.tsconfig.json

```JSON
{
  "compilerOptions": {
    "baseUrl": './',
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

在tsconfig.json中导入

```JSON
{
  "extends": "./path.tsconfig.json"
}
```

## 3.项目路由的分析

全段所谓路由：key-value键值对
key：URL（地址栏中的路径）
value：相应路由组件
项目结构：上中下

路由组件：Home，Search，Login
两个非路由组件：Header，Footer（在首页、搜索页有），在登陆页面没有

## 4.非路由组件的创建

项目开发：

* 书写静态页面
* 拆分组件
* 获取服务器的数据动态展示
* 完成相应的动态业务逻辑

* 注意1：项目创建的时候，组件结构 + 组建的样式 + 图片资源
* 注意2：项目采用less样式，通过less、less-loader进行处理

## 5.路由组件搭建

* Home、Login、Search、Register

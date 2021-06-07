# About
一款Markdown编辑器组件，支持使用markodwn语法来编写文档，同时支持图片上传等功能

# 使用

1. 通过script标签引入
```html
<script src="./markdown-editor.js"></script>
```
2. 指定需要渲染的容易
```html
<div id="app"></div>
```
3. 初始化实例
```js
new MdEditor({
    ...options
})
```

# options

| 属性 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| el | 编辑器渲染的容器 | String | "#app"
| themeOptions | 主题颜色配置 | Object | [themeOptions](#themeoptions)
| canAttachFile | 是否可以上传图片 | Boolean | true
| placeholder | placeholder | String | "请输入内容"
| onChange | 获取编辑器内容 | Function | function(res) {} [示例](#onchange)
| onUpload | 上传文件钩子函数 | Function | function(file, callback) {} [示例](#onupload)

# themeOptions

| 属性 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| borderColor | 编辑器边框默认颜色 | String | "#dbdbdb"
| borderColorActive | 编辑器边框激活颜色 | String | "#409eff"
| textColor | 编辑器文字默认颜色 | String | "#303030"
| textColorActive | 编辑器文字激活颜色 | String | "#000"

# onChange

```js
new MdEditor({
    ...,
    onChange: function(res) {
        console.log(res) // { text: "...", html: "..." }
    }
})
```

# onUpload

```js
new MdEditor({
    ...,
    onUpload: function(file, callback) {
        // do something with file
        // ajax
        // ...
        // 得到图片的url
        callback(url)
    }
})
```

# License

[MIT](https://codechina.csdn.net/codechina_dev/markdown-editor/-/blob/master/LICENSE)

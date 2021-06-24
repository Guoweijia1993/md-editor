# C Markdown 编辑器

一款Markdown编辑器组件，支持使用markodwn语法来编写文档，同时支持图片上传等功能（当前版本仅支持单文件上传）

## 更新记录

### v0.4

2021-06-23 v0.4更新，添加功能：

- throttle属性
- zIndex属性
- maxLength属性
- showWordLimit属性
- rows属性
- filePathRule属性
- [onLoad事件](#onload)
- [onInput事件](#oninput)
- [setValue方法](#setvalue)
- [getValue方法](#getvalue)
- [focus方法](#focus)
- [blur方法](#blur)
- **移除canAttachFile属性**
- **移除footer，工具栏添加上传文件按钮**
- 全屏模式添加工具栏

### v0.3

2021-06-17 v0.3更新，添加功能：

- [focus事件](#onfocus)
- [blur事件](#onblur)
- [ctrl+enter/command+enter快捷键](#onsubmit)
- [夜间模式](#themeoptions)

### v0.2

2021-06-15 v0.2更新，添加功能：

- [内容回显](#options)
- [顶部工具栏配置](#toolsoptions)

### v0.1 

2021-06-07 v0.1 初版更新，支持功能：

- 自定义主题
- 单张图片/单个附件上传
- Markdown & Html 内容获取



# 使用

1. 通过script标签引入
```html
<script src="./markdown-editor.js"></script>
```
2. 指定需要渲染的容器
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

| 属性 | 说明 | 类型 | 默认值 | 可选值 |
| ------ | ------ | ------ | ------ | ------ |
| el | 编辑器渲染的容器 | String | "#app" | |
| value | 编辑器回显内容 | String \| Number | "" | |
| zIndex | 全屏模式的层级 | String \| Number | 2000 | |
| maxLength | 最大字数限制 | String \| Number | 1000 | |
| showWordLimit | 是否显示当前字数 | Boolean | false | |
| rows | 编辑区行数 | String \| Number | 6 | 'auto' |
| throttle | input事件的节流时间 | Number | 1000 |  |
| filePathRule | 图片链接的格式限制 | RegExp | [示例](#filepathrule) | |
| themeOptions | 主题颜色配置 | Object | [themeOptions](#themeoptions)
| toolsOptions | 顶部工具栏配置 | Object | [toolsOptions](#toolsoptions)
| canPreview | 是否开启预览 | Boolean | true
| placeholder | placeholder | String | "请输入内容"
| onLoad | 编辑器实例化 | Function | function(res) {} [示例](#onload)
| onInput | 输入事件 | Function | function(res) {} [示例](#oninput)
| onFocus | 获取焦点事件 | Function | function(res) {} [示例](#onfocus)
| onBlur | 失去焦点事件 | Function | function(res) {} [示例](#onblur)
| onChange | 获取编辑器markdown及html内容 | Function | function(res) {} [示例](#onchange)
| onUpload | 上传文件钩子函数 | Function | function(file, callback) {} [示例](#onupload)
| onsubmit | 快捷键函数 | Function | function(file, callback) {} [示例](#onsubmit)

# 方法

| 方法 | 说明 | 类型 | 示例 |
| ------ | ------ | ------ | ------ |
| focus | 使编辑器获取焦点 | Function | [focus](#focus) |
| blur | 使编辑器失去焦点 | Function | [blur](#focus) |
| getValue | 获取编辑器的内容 | Function | [getValue](#getvalue) |
| setValue | 设置编辑器的内容 | Function | [setValue](#setvalue) |

# themeOptions

| 属性 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| dark | 夜间模式 | Boolean | false
| borderColor | 编辑器边框默认颜色 | String | "#dbdbdb"
| borderColorActive | 编辑器边框激活颜色 | String | "#409eff"
| textColor | 编辑器文字默认颜色 | String | "#303030"
| textColorActive | 编辑器文字激活颜色 | String | "#000"


# toolsOptions

| 属性 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| bold | 加粗 | Boolean | true
| italic | 斜体 | Boolean | true
| quote | 引用 | Boolean | true
| code | 代码块 | Boolean | true
| link | 链接 | Boolean | true
| ul | 无序列表 | Boolean | true
| ol | 有序列表 | Boolean | true
| task | 任务列表 | Boolean | true
| table | 表格 | Boolean | true
| file | 上传文件 | Boolean | true
| fullScreen | 全屏模式 | Boolean | true


# filePathRule
用于限制可上传文件的路径规则

```js
new MdEditor({
    ...,
    filePathRule: /^https:\/\/csdn\.net/
})

```


# onLoad
编辑器实例化后触发


```js
new MdEditor({
    ...,
    onLoad: function() {
        console.log('ready') // { text: "...", html: "..." }
    }
})
```

# onFocus
编辑器获取焦点时触发


```js
new MdEditor({
    ...,
    onFocus: function(res) {
        console.log(res) // { text: "...", html: "..." }
    }
})
```

# onBlur
编辑器失去焦点时触发


```js
new MdEditor({
    ...,
    onBlur: function(res) {
        console.log(res) // { text: "...", html: "..." }
    }
})
```

# onInput
用于获取markdown内容及编译后的html内容


```js
new MdEditor({
    ...,
    onInput: function(res) {
        console.log(res) // { text: "...", html: "..." }
    }
})
```

# onChange
用于获取markdown内容及编译后的html内容


```js
new MdEditor({
    ...,
    onChange: function(res) {
        console.log(res) // { text: "...", html: "..." }
    }
})
```

# onSubmit
按下ctrl+enter/command+enter组合键时触发


```js
new MdEditor({
    ...,
    onSubmit: function(res) {
        console.log(res) // { text: "...", html: "..." }
    }
})
```

# onUpload

上传或粘贴文件时会触发此函数

```js
new MdEditor({
    ...,
    onUpload: function(file, callback) {
        // do something with file
        // ajax
        // ...
        // 得到图片的url
        // 在callback函数中回传图片url，编辑器会将图片链接粘贴到内容里
        callback(url)
    }
})
```

# getValue

获取编辑器内容

```js
const myEditor = new MdEditor({
    ...
    }
})

const value = myEditor.getValue()
console.log(value)

或

myEditor.getValue(value => {
    console.log(value)
})
```

# setValue

设置编辑器内容

```js
const myEditor = new MdEditor({
    ...
    }
})

myEditor.setValue('this is new content')
```

# focus

使编辑器获取焦点

```js
const myEditor = new MdEditor({
    ...
    }
})

myEditor.focus()
```

# blur

使编辑器失去焦点

```js
const myEditor = new MdEditor({
    ...
    }
})

myEditor.blur()
```

# Example
```html
<div id="app"></div>
    <script src="./markdown-editor.js"></script>
    <script>
      new MdEditor({
        el: "#app", // required
        value: "回显的内容",
        themeOptions: {
          borderColor: "#dbdbdb",
          borderColorActive: "#409eff",
          textColor: "#303030",
          textColorActive: "#000"
        },
        toolsOptions: {
          bold: true,
          italic: false,
          quote: true,
          code: true,
          link: false,
          ul: true,
          ol: true,
          task: true,
          table: false,
          fullScreen: false
        },
        canPreview: true,
        canAttachFile: true,
        placeholder: "请输入内容",
        onChange: function(res) {
          const { text, html } = res
          // submit(text)
          // render(html)
        },
        onUpload: function(file, callback) {
          ajax.post('http://example.com', {
              file: file
          }).then(res=>{
              callback(res.url)
          })
        }
      });
    </script>
```

# License

[MIT](https://codechina.csdn.net/codechina_dev/markdown-editor/-/blob/master/LICENSE)

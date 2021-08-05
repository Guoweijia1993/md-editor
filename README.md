# Awesome-Markdown-Editor

一款Markdown编辑器组件，支持使用markodwn语法来编写文档，同时支持图片上传等功能（当前版本仅支持单文件上传）

## 更新记录


### v0.7

2021-08-05 v0.7更新，添加功能：

- 支持@指定用户[queryUserList](#queryuserlist)
- 支持网址渲染成卡片样式[renderLinks](#renderlinks)
- 优化标签过滤规则
- 添加[disabled属性](#toolsoptions)

### v0.6

2021-07-19 v0.6更新，添加功能：

- 优化工具栏表格交互
- 工具栏添加[格式刷](#toolsoptions)
- 添加[md语法说明](#toolsoptions)
- 添加代码语言选择
- 添加height属性

### v0.5

2021-06-29 v0.5更新，添加功能：

- tab快捷键
- tabSize属性
- [代码风格配置](#themeoptions)
- [toggleTab方法](#toggletab)
- [toggleFullScreen方法](#togglefullscreen)

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
| height | 编辑器高度 | String \| Number |  |  |
| tabSize | tab键缩紧空格数 | String \| Number | 2
| throttle | input事件的节流时间 | Number | 1000 |  |
| filePathRule | 图片链接的格式限制 | RegExp | [示例](#filepathrule) | |
| themeOptions | 主题颜色配置 | Object | [themeOptions](#themeoptions)
| toolsOptions | 顶部工具栏配置 | Object | [toolsOptions](#toolsoptions)
| canPreview | 是否开启预览 | Boolean | true
| disabled | 是否禁用 | Boolean | false
| placeholder | placeholder | String | "请输入内容"
| onLoad | 编辑器实例化 | Function | function(res) {} [示例](#onload)
| onInput | 输入事件 | Function | function(res) {} [示例](#oninput)
| onFocus | 获取焦点事件 | Function | function(res) {} [示例](#onfocus)
| onBlur | 失去焦点事件 | Function | function(res) {} [示例](#onblur)
| onChange | 获取编辑器markdown及html内容 | Function | function(res) {} [示例](#onchange)
| onUpload | 上传文件钩子函数 | Function | function(file, callback) {} [示例](#onupload)
| onsubmit | 快捷键函数 | Function | function(file, callback) {} [示例](#onsubmit)
| queryUserList | @用户列表查询函数 | Function | function(keyword), callback) {} [示例](#queryuserlist)
| renderLinks | 把链接渲染成卡片样式 | Function | function(list)), callback) {} [示例](#renderlinks)

# 方法

| 方法 | 说明 | 类型 | 示例 |
| ------ | ------ | ------ | ------ |
| focus | 使编辑器获取焦点 | Function | [focus](#focus) |
| blur | 使编辑器失去焦点 | Function | [blur](#focus) |
| getValue | 获取编辑器的内容 | Function | [getValue](#getvalue) |
| setValue | 设置编辑器的内容 | Function | [setValue](#setvalue) |
| toggleTab | 切换编辑和预览tab | Function | [toggleTab](#toggletab) |
| toggleFullScreen | 切换编辑器全屏模式 | Function | [toggleFullScreen](#togglefullscreen) |

# themeOptions

| 属性 | 说明 | 类型 | 默认值 | 可选值 |
| ------ | ------ | ------ | ------ | ------ |
| dark | 夜间模式 | Boolean | false
| borderColor | 编辑器边框默认颜色 | String | "#dbdbdb"
| borderColorActive | 编辑器边框激活颜色 | String | "#409eff"
| textColor | 编辑器文字默认颜色 | String | "#303030"
| textColorActive | 编辑器文字激活颜色 | String | "#000"
| codeTheme | 代码主题色配置 | String | "light" | 'light', 'dark', 'atom-one-dark' |


# toolsOptions

| 属性 | 说明 | 类型 | 默认值 | 说明 |
| ------ | ------ | ------ | ------ | ------ |
| bold | 加粗 | Boolean | true
| italic | 斜体 | Boolean | true
| quote | 引用 | Boolean | true
| format | 格式刷 | Boolean | true | 支持标题、加粗、斜体、引用、代码块、无序列表、任务列表 |
| code | 代码块 | Boolean | true
| link | 链接 | Boolean | true
| ul | 无序列表 | Boolean | true
| ol | 有序列表 | Boolean | true
| task | 任务列表 | Boolean | true
| table | 表格 | Boolean | true
| file | 上传文件 | Boolean | true
| help | markdown语法 | Boolean | true
| fullScreen | 全屏模式 | Boolean | true


# filePathRule
用于限制可上传文件的路径规则

```js
new MdEditor({
    ...,
    filePathRule: /^https:\/\/csdn\.net/
})

onInput/onChange事件中会返回invalidList[]列表，内容为不符合filePathRule规则的地址

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

# queryUserList

按下@键时触发此函数，通过回传用户列表可生成用户选择弹窗

```js
new MdEditor({
    ...,
     queryUserList: function(val, callback) {
          const list = [
            {
              nickname: "王一博",
              username: 'cpongo4',
              url: "https://weibo.com/u/5492443184",
              avatar:
                "https://img2.baidu.com/it/u=298051053,3773223854&fm=26&fmt=auto&gp=0.jpg"
            },
            {
              nickname: "王俊凯",
              username: 'cpongo5',
              url: "https://weibo.com/tfwangjunkai",
              avatar:
                "https://img1.baidu.com/it/u=2378425879,2273515018&fm=26&fmt=auto&gp=0.jpg"
            },
            {
              nickname: "易烊千玺",
              username: 'cpongo6',
              url: "https://weibo.com/tfyiyangqianxi",
              avatar:
                "https://img0.baidu.com/it/u=2227200088,1939721201&fm=26&fmt=auto&gp=0.jpg"
            },
            {
              nickname: "白敬亭",
              username: 'cpongo7',
              url: "https://weibo.com/u/2112496475",
              avatar:
                "https://img1.baidu.com/it/u=3265411836,2089649447&fm=11&fmt=auto&gp=0.jpg"
            }
          ];

          callback(list);
        }
})
```

# renderLinks

通过返回的链接信息把链接渲染成卡片样式

```js
renderLinks: function(val, callback) {
          const newLinks = val.map(item => {
            item.title =
              "指定的可执行文件cmd.exe未能运行，某某函数不正确-后端-CSDN问答";
            item.icon = "https://g.csdnimg.cn/static/logo/favicon32.ico";
            item.description =
              "CSDN问答为您找到指定的可执行文件cmd.exe未能运行，某某函数不正确相关问题答案，如果想了解更多关于指定的可执行文件cmd.exe未能运行，某某函数不正确 asp.net、c# 技术问题等相关问答，请访问CSDN问答。";
            return item;
          });

         callback(newLinks);

        },
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

# toggleTab

切换编辑器编辑和预览tab

```js
const myEditor = new MdEditor({
    ...
    }
})

myEditor.toggleTab() // 默认取反
myEditor.toggleTab({"edit")
myEditor.toggleTab("preview")
```

# toggleFullScreen

切换编辑器全屏模式

```js
const myEditor = new MdEditor({
    ...
    }
})

myEditor.toggleFullScreen() // 默认取反
myEditor.toggleFullScreen(true)
myEditor.toggleFullScreen(false)
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

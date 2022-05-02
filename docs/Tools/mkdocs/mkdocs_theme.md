# MkDocs - Wiki配置

<font size="2pt">往期回顾：</font>

<font size="2pt">第一期：[MkDocs - 初识](mkdocs_intro.md)</font>

<font size="2pt">第二期：[MkDocs - 部署WiKi站点到Github Pages](mkdocs_deploy_githubpages.md)</font>

<font size="2pt">第三期：[MkDocs - 部署WiKi站点到Nginx](mkdocs_deploy_nginx.md)</font>

-----------------

## 1.配置主题

MkDocs提供了多种主题供你选择。

* 内置主题 [mkdocs](https://www.mkdocs.org/user-guide/styling-your-docs/#mkdocs) 和 [readthedocs](https://www.mkdocs.org/user-guide/styling-your-docs/#readthedocs) ；

* [第三方主题](https://github.com/mkdocs/mkdocs/wiki/MkDocs-Themes)

选择你喜欢的主题，根据主题官网提示进行安装，比如:

```
pip install mkdocs-bootswatch
```

然后将如下内容添加到你的Wiki项目的 `mkdocs.yml`文件中。

```yaml
theme:
  name: 'your_theme_name' # 替换为你选择的主题的名称
```


## 2.代码高亮

```yaml
theme:
  name: 'your_theme_name'  # 你的主题名称
  highlightjs: true        # 打开代码高亮
  hljs_style: github       # 代码高亮风格
  hljs_languages:          # 编程语言
    - c
    - c++
    - java
    - python
```

* highlightjs：使能代码高亮功能，该功能由 [`highlight.js库`](https://highlightjs.org/) 提供，代码高亮功能默认是使能的，所以可以省略不写。

* hljs_style：代码高亮的风格，highlight.js库提供了 [`79种不同的风格`](https://highlightjs.org/static/demo/)，默认风格是：github。

* hljs_languages：highlight.js库默认仅支持23种编程语言，如果你使用的语言不在默认支持中，请添加到这里。

## 3.WiKi目录结构规划

我们希望归类管理Wiki页面，所以可以在 `my-wiki/doc` 文件夹下建立不同的分类文件夹：

```vim
my-wiki
├── docs
│   ├── c
│   │   └── c_language.md
│   ├── c++
│   │   └── c++_language.md
│   ├── first.md
│   ├── index.md
│   ├── java
│   │   └── java_language.md
│   ├── linux
│   │   ├── linux_app
│   │   │   └── linux_app.md
│   │   └── linux_drv
│   │       └── linux_drv.md
│   └── python
│       └── python_language.md
└── mkdocs.yml
```

然后在 `my-wiki/mkdocs.yml`中进行如下配置：

```
nav:
    - Home: index.md
    - First: first.md
    - C语言: c/c_language.md
    - C++语言: c++/c++_language.md
    - Java语言: java/java_language.md
    - Python语言: python/python_language.md
    - Linux开发:
        - Linux驱动开发: linux/linux_drv/linux_drv.md
        - Linux应用开发: linux/linux_app/linux_app.md
```


## 4.定制样式

虽然MkDocs提供了很多主题供我们选择，如果还是不能完全满足你的需求，那么可以尝试定制你自己喜欢的样式。

### 4.1 微调已有主题的样式

创建 `my-wiki/css/extra.css` 文件，并设置你想要的样式（字体样式、字体颜色、字体大小、段落行间距等）：

```css
h1 {
  margin-bottom:20px;  # 一级标题底边距为20px
}

h2 {
  font-size:20pt;      # 二级标题的字体大小为20pt
  margin-top:40px;     # 二级标题顶边距为40px
  margin-bottom:20px;  # 二级标题底边距为20px
}

h3 {
  font-size:17pt;      # 二级标题的字体大小为17pt
  margin-top:25px;     # 二级标题顶边距为25px
  margin-bottom:20px;  # 二级标题底边距为20px
}

p {
  font-family:"Arial","Microsoft YaHei","黑体","宋体","sans-serif"; # 段落的字体
  font-size:13pt;      # 段落字体的大小
  line-height:200%;    # 段落行间距
}

ul {
	line-height:200%;  # 无序列表行间距
}
```

然后在Wiki配置文件 `my-wiki/mkdocs.yml` 中添加如下内容：

```
extra_css:
    - css/extra.css
```


更多样式请自行百度搜索CSS网页布局学习。

### 4.2 Markdown与HTML语法相结合

设置文字大小：

```
<font size="2pt">文字内容</font>
```

设置文字颜色：

```
<font color="red">文字内容</font>
```

设置文字居中显示：

```
<center>文字内容</center>
```

以上HTML语法都可以嵌套使用，比如设置文字居中显示，并且文字为红色：

```
<center><font size="3pt">文字内容</font></center>
```

图片居中显示：

```
<center><p>![image](images/image.jpg)</p></center>
```

更多HTML语法请自行百度搜索学习。


## 5.在线Demo

在线Demo地址：[https://edgeai-lab.github.io/my-wiki](https://edgeai-lab.github.io/my-wiki)

在线Demo源码：[https://github.com/EdgeAI-Lab/my-wiki](https://github.com/EdgeAI-Lab/my-wiki)

----------------------------------------

<center><font size="3pt">更多精彩资讯，请扫码关注！</font></center>

<center><p>![weixingongzhonghao](../../assets/images/weixingongzhonghao.png)</p></center>
 
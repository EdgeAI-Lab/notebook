# MkDocs - 部署WiKi站点到Github Pages

<font size="2pt">往期回顾：</font>

<font size="2pt">第一期：[MkDocs - 初识](mkdocs_intro.md)</font>

--------

本期小编将带你了解如何将你的WiKi部署到Web服务器，使你的WiKi能够在互联网中被访问。

本期我们选择的Web服务器是Github Pages。

## 1.创建一个新的Github远程仓库

<font color="#DC4B33">熟悉Github使用的同学可以跳过本节，请自行创建一个Github远程仓库备用。</font>

没有Github账号的同学，请先到Github官网申请。

[点击进入Github官网](https://github.com/)

登录后选择右上角的新建仓库。

![](../../\assets\images\tools\mkdocs_build_wiki_site\github_new_repo.png)

然后按照提示填写仓库名称等。仓库创建成后，你将看到如下界面：

![](../../\assets\images\tools\mkdocs_build_wiki_site\github_new_repo02.png)

获取远程仓库地址备用。

## 2.本地WiKi站点配置

<font color="#DC4B33">熟悉Git使用的同学可跳过本节，请自行将Wiki站点my-project文件夹初始化为本地Git仓库。</font>

首先进入我们之前创建的WiKi项目文件夹my-project，将其初始化为一个本地Git仓库

```bash
cd my-project
git init
```
本地Git仓库初始化成功后，看上去就像这样：

![mkdocs_site](../../assets\images\tools\mkdocs_build_wiki_site\mkdocs_site_git.png)

在本地仓库中添加远程仓库链接
```bash
git add remote https://github.com/user_name/repository_name
```

将WiKi站点的源文件（Markdown文件）推送到远程仓库是可选的，因为部署你的WiKi网站只需要将HTML网页文件推送到远端即可。

```bash
git add .
git commit -m "first commit"
git push origin master
```

## 3. 部署到Github Pages

将你的WiKi站点部署到GitHub
```bash
mkdocs gh-deploy
```

该命令执行的动作：

1. 创建gh-pages分支，并切换到gh-pages分支；

2. 执行`mkdocs build`指令，将Markdown文件转换成HTML静态网页；

3. 将HTML静态网页推送到远端gh-pages分支；

4. 推送完成，切换回master分支。

完成部署之后，你的WiKi网站的HTML文件都部署在了gh-pages分支；markdown文件都部署在了master分支（假如你提交了的话）

这是master分支:

![git_master_branch](../../assets\images\tools\mkdocs_build_wiki_site\git_master_branch.png)

这是gh-pages分支:

![git_gh-pages_branch](../../assets\images\tools\mkdocs_build_wiki_site\git_gh-pages_branch.png)

现在使用类似下面的URL，就可以在互联网中访问你的Wiki站点了。

```
https://user_name.github.io/repository_name/
```

## 4.在线Demo

在线Demo地址：[https://edgeai-lab.github.io/my-project](https://edgeai-lab.github.io/my-project)

在线Demo源码：[https://github.com/EdgeAI-Lab/my-project](https://github.com/EdgeAI-Lab/my-project)


----------------------------------------

<center><font size="3pt">更多精彩资讯，请扫码关注！</font></center>

<center><p>![weixingongzhonghao](../../assets/images/weixingongzhonghao.png)</p></center>
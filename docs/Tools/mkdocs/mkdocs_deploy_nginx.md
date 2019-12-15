# MkDocs - 部署WiKi站点到Nginx Web服务器

<font size="2pt">往期回顾：</font>

<font size="2pt">第一期：[MkDocs - 初识](mkdocs_intro.md)</font>

<font size="2pt">第二期：[MkDocs - 部署WiKi站点到Github Pages](mkdocs_deploy_githubpages.md)</font>



-----------------

本期小编将带你了解如何将你的WiKi部署到Web服务器，使你的WiKi能够在互联网中被访问。

本期我们选择的Web服务器是Nginx。

## 1.下载Nginx源码

* [点击下载Nginx源码](http://nginx.org/en/download.html)

解压Nginx源码：

```
tar -xzvf nginx-1.x.x.tar.gz
```

## 2.编译安装

```
# 进入Nginx源码根目录
cd path/to/nginx

# 使用nginx默认配置即可
./configure

# 编译安装
make && make install
```

Nginx相关路径：

* nginx安装路径: "/usr/local/nginx"
* nginx可执行文件路径: "/usr/local/nginx/sbin/nginx"
* nginx配置文件路径: "/usr/local/nginx/conf/nginx.conf"

## 3.配置Nginx

打开配置文件：
``` 
sudo vim /user/local/nginx/conf/nginx.conf 
```

修改端口号和域名：

```
# 此处省略n行代码
http {
 
    # 此处省略n行代码

    server {
        listen       80;         # 修改端口号
        server_name  localhost;  # 修改域名

        location / {
            root   html;         # 此处为存放网站的目录path/to/nginx/html/
            index  index.html index.htm;
        }

        # 此处省略n行代码

    }

    # 此处省略n行代码
}

```

Nginx配置说明：

* `listen 80;` 服务器监听的端口号为80
* `server_name  localhost;` 以Nginx服务器的IP地址作为host
* `root   html;` 网站存放的目录

## 4.启动nginx

```
cd /user/local/nginx/sbin
sudo ./nginx
```


## 5.查看nginx是否正确运行

打开浏览器输入服务器IP地址，如果Nginx正常启动，你将看到如下界面：

![](../../assets\images\tools\mkdocs_build_wiki_site\nginx_start.png)


## 6. 生成静态网站

利用MkDocs将WiKi源文件（Markdown文件）转成HTML静态网站。

此处以第一期：[MkDocs - 初识](mkdocs_intro.md)中我们创建的wiki项目为例。

```
# 进入wiki项目目录
cd my-project

# 生产静态网站
mkdocs build
```

`mkdocs build` 命令执行后，将会在wiki项目目录下生成 `site` 文件夹，该文件夹中包含的就是静态网站。

![](../../assets\images\tools\mkdocs_build_wiki_site\mkdocs_site_folder.png)


## 7.将Wiki站点部署到Nginx

将 `site` 文件夹中的内容复制到Nginx服务器上的 `/user/local/nginx/html` 目录下即可。

![](../../assets\images\tools\mkdocs_build_wiki_site\mv_wiki_html_to_server.png)



----------------------------------------

<center><font size="3pt">更多精彩资讯，请扫码关注！</font></center>

<center><p>![weixingongzhonghao](../../assets/images/weixingongzhonghao.png)</p></center>
# Nginx配置静态网站服务器(使用预编译的Nginx)

## 1.安装Nginx

Ubuntu默认已经安装了Nginx，使用下面命令查看是否已安装nginx

```
whereis nginx
```


如果没有请重新安装

```
sudo apt-get install nginx
```


## 2.Nginx的默认配置

* Nginx默认的配置文件是/etc/nginx/sites-available/default

为什么默认的配置文件是这个呢？

Nginx的默认配置文件为/etc/nginx/nginx.conf，Nginx启动的时候就会去加载这个配置文件，在这个默认的配置文件中如下内容：

```
include /etc/nginx/sites-enabled/*
```

它包含了sites-enabled/目录下的所文件，在Nginx的初始状态下sites-enabled/目录中只有一个default文件，而这个default文件是一个链接文件，它指向了/etc/nginx/sites-available/default文件


* Nginx默认的网站目录是/var/www/html

## 3.配置Nginx支持访问图片资源

将图片放在/var/www/image/目录下

```nginx
location /image/ {
	root /var/www;
	autoindex on;
}
```


## 4.配置Nginx支持访问视频资源

将视频资源放在/var/www/video/文件夹下

```nginx
location /video/ {
	root /var/www;
	autoinxdex on;
}
```







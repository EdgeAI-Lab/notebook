# nginx

## 1.下载源码
* [nginx官网下载地址](http://nginx.org/en/download.html)


## 2.编译安装

* 使用nginx默认配置

```
./configure

make

make install

```

## 3.启动nginx

* 先进入nginx的安装目录 ``` /user/local/nginx/sbin ```
* 运行nginx ``` sudo ./nginx ```


## 4.问题解决

* 如果提示，所用的端口已被绑定，那么请修改配置文件中的端口 ``` sudo vim /user/local/nginx/conf/nginx.conf ```



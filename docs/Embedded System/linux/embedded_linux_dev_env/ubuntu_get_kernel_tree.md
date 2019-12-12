# Ubuntu 内核源码树

查看Ubuntu正在使用的Linux内核版本

```
uname -r
```

一般在/usr/src 目录下就会有内核源码树，如果没有，使用下面的命令安装

```
sudo apt-get install linux-source
sudo apt-get install linux-headers-`uanem -r`
```

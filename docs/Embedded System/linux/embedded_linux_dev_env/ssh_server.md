# SSH服务器搭建


## 1. 安装SSH

```
sudo apt-get install openssh-server
```
## 2. 查看SSH是否启动

```
sudo ps -e |grep ssh
```
![sshd](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwNjE3MDk0MjM3Mzg2?x-oss-process=image/format,png)

命令后若出现sshd则表明SSH服务已启动，否则需启动SSH服务

```bash
sudo service ssh start
```

## 3.使用PuTTY登陆SSH服务器

![PuTTY](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwNjE3MDkyNDMyNTY0?x-oss-process=image/format,png)

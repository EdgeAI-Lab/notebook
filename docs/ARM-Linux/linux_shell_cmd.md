# Linux Shell CMD

##1. dd
```shell

sudo dd if=/xx/xx/xx.img of=/dev/sdc bs=512M

```
* if -- input file
* of -- output file


##2. rm

```shell
# 除file之外的文件全部删除
rm -f !(file)

# 除file1,file2,...之外的文件全部删除
rm -f !(file1|file2|...)
```

##3. 硬盘相关

* 硬盘分区格式化
```bash
# 分区
sudo fdisk /dev/sdx

# 格式化
sudo mkfs.vfat /dev/sdx

```

* 查看硬盘容量使用情况
```bash
# 查看硬盘容量使用情况 -h --human-readable
df -hl /dev/sda1

# 查看文件或者文件夹的大小
du -hl xxx



```




##4. 网络传输相关命令

* wget
```bash
wget https://ftp.gnu.org/gnu/wget/wget-latest.tar.gz

# 匿名登录FTP服务器并下载文件
wget ftp://192.168.10.100/fhc/wuhuanWiki/site.zip

# 使用用户名密码登录并下载文件
wget ftp://username:paswword@192.168.10.100/fhc/wuhuanWiki/site.zip

```

* scp

```bash

scp source_file username@host:/path

```



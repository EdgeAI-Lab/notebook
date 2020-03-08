# Uboot

[Uboot官网](http://www.denx.de/wiki/U-Boot/)
[Uboot下载地址](ftp://ftp.denx.de/pub/u-boot/)

## 1. Uboot参数配置方法

```
# 查看支持的命令
help / ?

# 查看某个命令的介绍
? cmd_name

# 设置参数
setenv ipaddr 192.168.1.100

# 删除参数
setenv ipaddr

# 将参数永久保存到Flash
saveenv

```

## 2. 设置启动参数

```
setenv bootargs noinitrd root=/dev/mtdblock3 init=/linuxrc console=ttySAC0,115200
```

## 3. 使用NFS下载文件到内存
```
nfs 32000000 192.168.2.200:/home/fhc/linux_driver/nfs/uImage
```
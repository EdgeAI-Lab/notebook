# Linux Kernel

## 1. 使用公板默认配置编译linux kernel

修改顶层Makefile，修改如下内容：

```
ARCH ?=arm

CROSS_COMPILE ?= arm-linux-gnueabi-
```

找到默认配置s3c2410_defconfig

```
find -name "*defconfig"
```

配置linux kernel：
```
make s3c2410_defconfig
```

编译linux kernel：
```
make uImage
```

编译完成后生成的linux kernel映像文件路径是：arch/arm/boot/uImage


## 2.加载linux kernel

通过网络从服务器上下载uImage：
```
nfs 32000000 192.168.2.200:/home/fhc/linux_driver/nfs/uImage


tftpboot 32000000 /home/fhc/linux_driver/nfs/uImage
```

启动linux kernel：
```
bootm 32000000
```


## 内核打补丁的方法

```
patch -p1 < path/to/patch_file.patch
cp config_ok .config
```
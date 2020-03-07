# Linux Kernel


## 2.内核打补丁

```
patch -p1 < path/to/patch_file.patch
cp config_ok .config
```

## 1. Config

修改顶层Makefile，修改如下内容：

```
ARCH ?=arm

CROSS_COMPILE ?= arm-linux-gnueabi-
```

找到默认配置s3c2410_defconfig

```
find -name "*defconfig"
```

配置：
```
make s3c2410_defconfig
```

编译：
```
make uImage
```


```
nfs 32000000 192.168.2.200:/home/fhc/linux_driver/nfs/uImage


tftpboot 32000000 /home/fhc/linux_driver/nfs/uImage
```

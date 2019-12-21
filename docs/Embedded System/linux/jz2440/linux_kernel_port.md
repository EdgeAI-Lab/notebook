# Linux Kernel

## 1. Config

修改顶层Makefile，修改如下内容：

```
ARCH ?=arm

CROSS_COMPILE ?= arm-linux-gnueabi-
```

找到默认配置s3c2410_defconfig

```
find -name "*defconfig"
``

配置：
```
make s3c2410_defconfig
```

编译：
```
make uImage
```

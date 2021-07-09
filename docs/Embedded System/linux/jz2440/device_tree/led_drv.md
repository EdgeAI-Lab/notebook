# 以设备树的方式编写LED驱动

## 1.首先将JZ2440安装上支持设备树的Linux系统

* [ARM交叉编译器](https://pan.baidu.com/s/1Q-KG0I3ucJ5my1lZheoqFw)  - 提取码：ryvl

> 在编译u-boot和kernel时, 我们可以使用新的工具链, 
只要这个工具链支持ARM9的指令集(armv4)就可以(这通常可以通过编译参数来指定使用特定的指令集).
工具链可以从某些网站上下载，并不需要自己去制作。
比如可以访问这个网站: https://releases.linaro.org/components/toolchain/binaries/4.9-2017.01/arm-linux-gnueabi/
下载: gcc-linaro-4.9.4-2017.01-x86_64_arm-linux-gnueabi.tar.xz

> 但是在制作根文件系统时, 实际上我们是编译各种APP, 
这些APP要用到一些动态库, 为了方便一般直接使用工具链中lib目录里的库。
新版工具链的lib库一般是支持新的芯片，比如cortex A7,A8,A9，并不支持ARM9。
所以在制作根文件系统、编译APP时我们还得使用比较老的工具链: arm-linux-gcc-4.3.2.tar.bz2

* [支持设备树的Image文件](https://pan.baidu.com/s/1IBTDe-_BvRMKEAVctYWkuQ) - 提取码：tqqf

* 烧写方法可以参考 [JZ2440烧写镜像文件的方法](../jz2440_download_image_files.md)

* 烧写dtb文件的方法

```
nfs 30000000 192.168.2.200:/home/fhc/linux_driver/nfs/device_tree/jz2440.dtb
nand erase device_tree
nand write.jffs2 30000000 device_tree
```

## 2.构建Linux内核源码树

Uboot和rootfs可以使用已经编译好的Image，因为我们开发驱动驱动程序可以不使用他们，但是驱动开发和设备树编译必须有Linux源码。

Linux源码配置编译的方法可以参考 [为JZ2440准备具有设备树的内核](compile_uboot_kernel_with_device_tree.md)

新的Linux内核启动后，可能没有配置网络，此时使用ifconfig命令将不会有任何反馈。可直接配置网址：

```
$ifconfig eth0 192.168.2.17
```



## 3. 开发LED驱动程序
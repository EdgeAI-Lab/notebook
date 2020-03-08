# 使用Uboot烧写内核和文件系统

## 1.查看Flash分区情况

在Uboot命令行执行如下命令：
```
mtdpart
```
然后就会列出Flash的分区情况。在烧写内核和文件系统的时候，要严格按照这里的分区名称来写。


## 2.烧写内核

```
nfs 32000000 192.168.2.200:/home/fhc/linux_driver/nfs/uImage

nand erase kernel

nand write.jffs2 32000000 kernel
```

## 3.烧写文件系统

```
// 文件系统的大小不能超过内存的大小，否则下载会出错，所以一般将内存地址设置为内存的起始地址
nfs 30000000 192.168.2.200:/home/fhc/linux_driver/nfs/fs_qtopia.yaffs2

nand erase root

// nand write.[文件系统类型jaffs2或者yaff] 文件源的内存地址  flash上的烧写地址  文件源的大小（网络下载后有提示）
nand write.yaff 30000000 0x00260000 0x791340
```
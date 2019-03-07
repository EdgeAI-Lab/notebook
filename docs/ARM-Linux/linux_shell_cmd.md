# Linux Shell CMD

## dd
```shell

sudo dd if=/xx/xx/xx.img of=/dev/sdc bs=512M

```
* if -- input file
* of -- output file


## rm
* 除file之外的文件全部删除
```shell
rm -f !(file)
```

* 除file1,file2,...之外的文件全部删除
```shell
rm -f !(file1|file2|...)
```

## 硬盘分区格式化

* 分区
```bash

sudo fdisk /dev/sdx

```

* 格式化

```bash

sudo mkfs.vfat /dev/sdx

```
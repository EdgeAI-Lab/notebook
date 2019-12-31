# Uboot 移植

[u-boot 2012.04.01下载](https://pan.baidu.com/s/14BdXItENbN85Cx6uWXPjfQ)
[补丁和交叉编译工具链下载](https://pan.baidu.com/s/1BEk4wALVO8TqOg2dmlTHXw)

使用工具链arm-linux-gcc 4.3.2

```
export PATH=$PATH:/path/to/4.3.2/bin
```

配置uboot

```
make smdk2410_config
```
----------------------

使用JZ2440官方的补丁



## Uboot打补丁

```
cd uboot_root_dir

patch -p1 < path/to/patch_file.patch
```

## 编译

```
make distclean

make smdk2440_config

make
```
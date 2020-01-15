# Uboot 移植

## 1. 资源下载

* [u-boot 2012.04.01下载](https://pan.baidu.com/s/14BdXItENbN85Cx6uWXPjfQ)

* [补丁和交叉编译工具链下载](https://pan.baidu.com/s/1BEk4wALVO8TqOg2dmlTHXw)


## 2.配置工具链

使用工具链arm-linux-gcc 4.3.2。

```
# 仅当前环境生效
export PATH=$PATH:/path/to/4.3.2/bin
```

## 3. Uboot打补丁

使用JZ2440官方的补丁

```
cd uboot_root_dir

patch -p1 < path/to/patch_file.patch
```

## 4. 编译

```
make distclean

make smdk2410_config

make
```
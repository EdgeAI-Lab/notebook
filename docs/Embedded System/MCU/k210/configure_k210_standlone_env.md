# K210 Hello World

[K210官网](https://kendryte.com/)

## 1. 安装K210交叉编译工具链

首先下载K210交叉编译工具链，如果想自己从源码编译出工具链，请参考官方Github相关文档。

* [K210交叉编译工具链下载地址1](https://github.com/kendryte/kendryte-gnu-toolchain/releases)
* [K210交叉编译工具链下载地址2](https://kendryte.com/downloads/)

然后安装K210交叉编译工具链，其实就是将工具链文件解压到相应的目录。

* 编译时报错：error while loading shared libraries: libisl.so的解决方法

```shell
export LD_LIBRARY_PATH=/home/zk/vincross/workspace/k210/packages/kendryte-toolchain/bin:$LD_LIBRARY_PATH
```

详细可参考：[https://github.com/kendryte/kendryte-gnu-toolchain/issues/5](https://github.com/kendryte/kendryte-gnu-toolchain/issues/5)

## 2.下载SDK

[点击下载SDK](https://github.com/kendryte)


## 3.编译Hello World项目

进入SDK根目录，新建编译目录

```
mkdir hello_world_build_out

cd hello_world_build_out
```

然后编译

```
cmake .. -DPROJ=hello_world -DTOOLCHAIN=/home/zk/vincross/workspace/k210/packages/kendryte-toolchain/bin && make
```

## 4.下载程序

在Linux系统中使用KFlash工具

[kflash官网](https://github.com/kendryte/kflash.py)

* 安装kflash

```shell
sudo pip3 install kflash
```

* 下载到Flash运行
```
kflash -B kd233 firmware.bin
kflash -B kd233 -t firmware.bin # Open a Serial Terminal After Finish
```

* 下载到SRAM运行

```
# For `.elf` file
kflash -b 115200 -B kd233 -s -t hello_world
# For `.bin` file
kflash -b 115200 -B kd233 -s -t hello_world.bin

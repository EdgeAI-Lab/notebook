## FFMPEG API使用介绍

### 1.源码编译
* [下载源码](https://ffmpeg.org/download.html)
* 使用下面的命令编译源码

```
# make install会将编译出的库、头文件和.pc文件都安装到local_build
./configure --prefix=$PWD/local_build

make

make install
```

### 2.pkg-config使用
FFMPEG编译安装后，其.pc文件都在ffmpeg-x.x/local_build/lib/pkgconfig中，pkg-config无法找到它们，所以需要将其
复制到pkg-config的搜索路径中

```
sudo cp ffmpeg-x.x/local_build/lib/pkgconfig/* /usr/lib/x86_64-linux-gnu/pkgconfig

```

注意：你也可以单独添加一个pkg-config，但是记得删除旧版本；复制有一个好处，能够覆盖旧版本

```
# 查看pkg-config默认搜索路径
pkg-config --variable pc_path pkg-config

```
### 3.编译使用例程

```
cd ffmpeg-x.x/doc/example

gcc -o transcode_aac transcode_aac.c `pkg-config --libs --cflags libavcodec libavformat libavutil libswresample`

```

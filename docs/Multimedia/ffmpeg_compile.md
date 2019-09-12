# FFMPEG编译

### 1.源码编译
* [下载源码](https://ffmpeg.org/download.html)
* 使用下面的命令编译FFMPEG源码

```
# make install会将编译出的库、头文件和.pc文件都安装到local_build
./configure --prefix=$PWD/local_build

make

make install
```

!!! Note
	以上编译，只能编译出ffmpeg和ffprobe

### 2.编译ffplay

* [下载SDL2.0](https://www.libsdl.org/download-2.0.php)
* 使用下面的命令编译SDL源码

```
./configure

make 


make install

```

* 配置使能SDL``` --enable-sdl ```，然后重新编译FFMPEG

```
./configure --enable-sdl --prefix=$PWD/local_build

make

make install

```

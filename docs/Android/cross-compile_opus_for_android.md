# Cross-Compile OPUS

## 1.Create Standalone Toolchains for ARM-Android

[Standalone Toolchains](https://developer.android.com/ndk/guides/standalone_toolchain)

```bash
# NDK18以及之前的版本
/build/tools/make_standalone_toolchain.py --arch arm --api 21 --install-dir /tmp/my-android-toolchain

# NDK19已经默认安装单机工具链，make_standalone_toolchain.py脚本已经不再需要

```

## 2.Configure the Environment variable

```bash
# 导出需要使用的编译工具（NDK18以及之前的版本）
export PATH=$PATH:your_ndk_bin_path
export CC=your_ndk_gcc_name
export CXX=your_ndk_g++_name

# Add the standalone toolchain to the search path.
export PATH=$PATH:`pwd`/my-toolchain/bin

# Tell configure what tools to use.
target_host=aarch64-linux-android
export AR=$target_host-ar
export AS=$target_host-clang
export CC=$target_host-clang
export CXX=$target_host-clang++
export LD=$target_host-ld
export STRIP=$target_host-strip

# Tell configure what flags Android requires.
export CFLAGS="-fPIE -fPIC"
export LDFLAGS="-pie"

# NDK19
export TOOLCHAIN=$NDK/toolchains/llvm/prebuilt/$HOST_TAG
export AR=$TOOLCHAIN/bin/aarch64-linux-android-ar
export AS=$TOOLCHAIN/bin/aarch64-linux-android-as
export CC=$TOOLCHAIN/bin/aarch64-linux-android21-clang
export CXX=$TOOLCHAIN/bin/aarch64-linux-android21-clang++
export LD=$TOOLCHAIN/bin/aarch64-linux-android-ld
export RANLIB=$TOOLCHAIN/bin/aarch64-linux-android-ranlib
export STRIP=$TOOLCHAIN/bin/aarch64-linux-android-strip

```

## 3.Compile

```bash

sudo apt-get install autoconf libtool-bin automake

git clone https://git.xiph.org/opus.git

./autogen.sh

> 因为OPUS是Autoconf工程，现在Autoconf已经对Android配置提供了支持，所以使用下面的命令即可编译出Android版本的OPUS

```bash
./configure --host=aarch64-linux-androideabi --prefix=/home/fhc/opus/android_build

make

make install

```

## 4.Compile Demo
```bash
# 手动链接库和头文件
gcc src/opus_demo.c -L./local_build/lib -lopus -I./local_build/include -I./local_build/include/opus -I./silk -I./celt -I./include -lm

# 使用pkg-config
gcc tcp_opus.c -o tcp_opus `pkg-config --libs --cflags opus`
```

## 5.参考Demo

* doc/trivial_example.c 例程比较简单，适合入门参考







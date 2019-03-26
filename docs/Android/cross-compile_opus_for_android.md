# Cross-Compile OPUS

## 1. Create Standalone Toolchains for ARM-Android

[Standalone Toolchains](https://developer.android.com/ndk/guides/standalone_toolchain)

```bash

/build/tools/make_standalone_toolchain.py --arch arm --api 21 --install-dir /tmp/my-android-toolchain

```



## 2. Configure the Environment variable

```bash
export PATH=$PATH:your_ndk_bin_path
export CC=your_ndk_gcc_name
export CXX=your_ndk_g++_name

```

## 3. compile

```bash

sudo apt-get install autoconf libtool-bin automake

git clone https://git.xiph.org/opus.git

./autogen.sh

./configure --host=arm-linux --prefix=your_install_absolute_path

make

make install

```

gcc src/opus_demo.c -L./local_build/lib -lopus -I./local_build/include -I./local_build/include/opus -I./silk -I./celt -I./include -lm
gcc tcp_opus.c -o tcp_opus `pkg-config --libs --cflags opus`
* OPUS官方已经提供了对Android的支持
./configure --host=arm-linux-androideabi --prefix=/home/fhc/opus/android_build








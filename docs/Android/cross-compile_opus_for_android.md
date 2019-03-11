# Cross-Compile OPUS for Android

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



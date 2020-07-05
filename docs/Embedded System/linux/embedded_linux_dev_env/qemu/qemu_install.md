# QEMU初体验

## 1. 源码下载方式

[QEMU git仓库地址]( git://git.qemu-project.org/qemu.git)
[官网下载源码压缩包](https://download.qemu.org/)

## 2. 配置并编译QEMU


```shell
../configure --help

Usage: configure [options]
Options: [defaults in brackets after descriptions]

Standard options:
  --help                   print this message
  --prefix=PREFIX          install in PREFIX [/usr/local]
  --interp-prefix=PREFIX   where to find shared libraries, etc.
                           use %M for cpu name [/usr/gnemul/qemu-%M]
  --target-list=LIST       set target list (default: build everything)
                           Available targets: aarch64-softmmu alpha-softmmu
                           arm-softmmu cris-softmmu hppa-softmmu i386-softmmu
                           lm32-softmmu m68k-softmmu microblaze-softmmu
                           microblazeel-softmmu mips-softmmu mips64-softmmu
                           mips64el-softmmu mipsel-softmmu moxie-softmmu
                           nios2-softmmu or1k-softmmu ppc-softmmu ppc64-softmmu
                           riscv32-softmmu riscv64-softmmu rx-softmmu
                           s390x-softmmu sh4-softmmu sh4eb-softmmu
                           sparc-softmmu sparc64-softmmu tricore-softmmu
                           unicore32-softmmu x86_64-softmmu xtensa-softmmu
                           xtensaeb-softmmu aarch64-linux-user
                           aarch64_be-linux-user alpha-linux-user
                           arm-linux-user armeb-linux-user cris-linux-user
                           hppa-linux-user i386-linux-user m68k-linux-user
                           microblaze-linux-user microblazeel-linux-user
                           mips-linux-user mips64-linux-user
                           mips64el-linux-user mipsel-linux-user
                           mipsn32-linux-user mipsn32el-linux-user
                           nios2-linux-user or1k-linux-user ppc-linux-user
                           ppc64-linux-user ppc64abi32-linux-user
                           ppc64le-linux-user riscv32-linux-user
                           riscv64-linux-user s390x-linux-user sh4-linux-user
                           sh4eb-linux-user sparc-linux-user
                           sparc32plus-linux-user sparc64-linux-user
                           tilegx-linux-user x86_64-linux-user
                           xtensa-linux-user xtensaeb-linux-user
  --target-list-exclude=LIST exclude a set of targets from the default target-list

Advanced options (experts only):

  --audio-drv-list=LIST    set audio drivers list:
                           Available drivers: oss alsa sdl pa
````


* --target-list=aarch64-softmmu 64位arm平台
* --target-list=arm-softmmu 32位arm平台
* --audio-drv-list 选择音频驱动，ALSA目前是Linux平台的主流



```shell
# create build directory in QEMU source root directory
mkdir build && cd build

#configure 64 bit
../configure --target-list=aarch64-softmmu --audio-drv-list=alsa

#configure 32 bit
../configure --target-list=arm-softmmu --audio-drv-list=alsa
```

如果有如下报错：

```shell
ERROR: alsa check failed
       Make sure to have the alsa libs and headers installed.
```

请安装 libasound2-dev
```shell
sudo apt install libasound2-dev
```

* 编译QEMU

```shell
# compile
make

# 
make install
```
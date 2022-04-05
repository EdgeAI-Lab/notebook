# Rebuild Linux kernel

编译Linux Kernel需要使用Developer SDK，Developer SDK分为两部分：

* [STM32MP1Dev Linux源码包](https://www.st.com/content/st_com/en/products/embedded-software/mcu-mpu-embedded-software/stm32-embedded-software/stm32-mpu-openstlinux-distribution/stm32mp1dev.html#get-software)

* [Yocto_SDK 交叉编译器](https://www.st.com/content/st_com/en/products/embedded-software/mcu-mpu-embedded-software/stm32-embedded-software/stm32-mpu-openstlinux-distribution/stm32mp1dev.html#get-software)

## 1. 配置交叉编译环境

下载Developer SDK中的Yocto_SDK，按照安装提示进行操作：

```
$> source /home/fhc/cross_compiler/environment-setup-cortexa7t2hf-neon-vfpv4-ostl-linux-gnueabi
```

安装依赖：
```
$> sudo apt-get update
$> sudo apt-get install gawk wget git-core diffstat unzip texinfo gcc-multilib build-essential chrpath socat cpio python3 python3-pip python3-pexpect xz-utils debianutils iputils-ping python3-git python3-jinja2 libegl1-mesa libsdl1.2-dev pylint3 pylint xterm
$> sudo apt-get install make xsltproc docbook-utils fop dblatex xmlto
$> sudo apt-get install libmpc-dev libgmp-dev
```

## 2. 解压Linux内核源码并打上补丁

* 解压Linux Kernel
```
$> cd stm32mp1-openstlinux-5.10-dunfell-mp1-21-11-17/sources/arm-ostl-linux-gnueabi/linux-stm32mp-5.10.61-stm32mp-r2-r0
$> tar xvf linux-5.10.61.tar.xz
```

* 打补丁
```
$> cd linux-5.10.61
$> for p in `ls -1 ../*.patch`; do patch -p1 < $p; done
```

```
apt-get install libyaml-dev libpython2.7-dev
```

```
sudo apt-get install libssl-dev 
```
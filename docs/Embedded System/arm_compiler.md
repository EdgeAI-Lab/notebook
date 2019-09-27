# ARM编译器

不同的工具链使用的C库可能不同。


## 一、 基于ARM内核的种类进行分类

### 1.1 适用于Cortex-M/R内核的编译器

 * 【收费】ARM Compiler(随ARM的IDE发布)： [Arm Development Studio](https://developer.arm.com/tools-and-software/embedded/arm-development-studio) 和 [Keil MDK](https://developer.arm.com/tools-and-software/embedded/keil-mdk)

 * 【收费】ARM Compiler(单独发布)：[Arm Compiler](https://developer.arm.com/tools-and-software/embedded/arm-compiler)

* 【收费】IAR编译器仅随IAR的IDE发布：[IAR](https://www.iar.com/iar-embedded-workbench/) 


ARM Compiler和IAR属于收费软件，结合ARM和IAR的IDE就能很方便的完成MCU的软件开发，这也是我们平时使用最多的方式。

* [The GNU Toolchain for the Cortex-R/M](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads)

GNU Toolchain for the Cortex-R/M是基于GCC开发的，免费软件，适用于Cortex-R/M作为内核的MCU。

一般它们是这个样子的:
```
arm-none-eabi-gcc
arm-none-eabi-g++
arm-none-eabi-ar
arm-none-eabi-as

...
```

### 1.2 适用于Cortex-A内核的编译器

 * 【收费】ARM Compiler(随ARM的IDE发布)： [Arm Development Studio](https://developer.arm.com/tools-and-software/embedded/arm-development-studio)

 * 【收费】ARM Compiler(单独发布)：[Arm Compiler](https://developer.arm.com/tools-and-software/embedded/arm-compiler)

ARM Compiler为收费软件，适用于ARM全系列内核。

 * [The GNU Toolchain for the Cortex-A Family](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-a/downloads)

GNU Toolchain for the Cortex-A是基于GCC开发的，免费软件，适用于Cortex-A作为内核的处理器。一本分为编译裸机程序的和编译Linux应用程序的（详情参考上面的链接）。

```shell
# 可以编译裸机程序和Linux应用程序
aarch64-linux-gnu-gcc

# 仅可以编译裸机程序


```

* [Android NDK](https://developer.android.google.cn/ndk)

Android NDK是免费软件，适用于编译Android Native(C/C++)应用程序。



## 二、 基于编译器的种类进行分类

### 2.1 ARM Compiler

 Arm Compiler的发布途径有两种：  

 * 随ARM的IDE发布： [Arm Development Studio](https://developer.arm.com/tools-and-software/embedded/arm-development-studio) 和 [Keil MDK](https://developer.arm.com/tools-and-software/embedded/keil-mdk)

 * 单独发布：[Arm Compiler](https://developer.arm.com/tools-and-software/embedded/arm-compiler)


### 2.2 IAR
* [IAR](https://www.iar.com/iar-embedded-workbench/) 的编译器只随其IDE发布



### 2.3 GCC For ARM

GCC For ARM的发布途径主要有四种：

* [Linaro](https://www.linaro.org/)

* [GNU Toolchain For ARM](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain)

* 使用 [crosstool-ng](http://crosstool-ng.github.io/) 自己编译

* [Android NDK](https://developer.android.google.cn/ndk)

GCC全称为GNU编译器套件(GNU Compiler Collection)。它包括了C、C++、Objective-C、Fortran、Java、Ada、Go语言和D语言的前端，也包括了这些语言的库（如libstdc++、libgcj等等）。  

GCC for ARM 则是基于开源的GCC开发而来，用来编译生成ARM内核可执行文件的编译套件，称之为ARM交叉编译套件/工具链。

由于GCC for ARM的使用非常广泛，种类也比较多，一般通过其命名进行区分。

* GCC for ARM的命名规则

> 注意：其命名规则并不是十分严格规范，大概做个参考吧

```
arch [-vendor] [-os] [-(gnu)eabi] [-gcc]

```

|参数|含义|
|----|---|
|arch|体系架构，如 arm , aarch64 , mips
|vendo| 工具链提供商，没有 vendor 时，用 none 代替；
|os|目标操作系统，没有 os 支持时，也用 none 代替
|eabi|嵌入式应用二进制接口（Embedded Application Binary Interface）

如果同时没有 vendor 和 os 支持，则只用一个 none 代替。  


举例：

* arm-none-eabi-gcc

适用于Cortex-M/R内核，比如STM32，编译裸机程序

|参数|含义|
|----|---|
|arm|内核为arm 32位架构，如Cortex-M/R内核|
|none|工具链提供商，无目标操作系统，如：STM32程序的编译|
|eabi|嵌入式应用二进制接口|
|gcc|目标语言为C语言|


* aarch64-linux-gnu-gcc

适用于Cortex-A内核，如Cortex-A53，编译裸机程序(boot、kernel等)、Linux应用程序均可

|参数|含义|
|----|---|
|aarch64|内核为arm 64位架构，如Cortex-A内核|
|linux|目标操作系统为Linux|
|gnu|工具链提供商为GNU|
|gcc|目标语言为C语言|


### 2.4 Clang For ARM

* [Arm Compiler 6](https://developer.arm.com/tools-and-software/embedded/arm-compiler)

* [Android NDK](https://developer.android.google.cn/ndk)

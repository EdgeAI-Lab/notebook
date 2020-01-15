# ARM编译器那些事

基于ARM内核的芯片在我们的世界中无处不在，从简单的MCU到高端的应用处理器，各行各业中都有它们的身影。如今ARM生态系统非常繁荣，在这繁荣的背后编译器的作用功不可没。

ARM编译器的供应商主要是ARM公司，IAR公司和GNU开源组织。

## 1. 适用于Cortex-M/R内核的编译器

 * 【收费】ARM Compiler(随ARM的IDE发布)： [Arm Development Studio](https://developer.arm.com/tools-and-software/embedded/arm-development-studio) 和 [Keil MDK](https://developer.arm.com/tools-and-software/embedded/keil-mdk)

 * 【收费】ARM Compiler(单独发布)：[Arm Compiler](https://developer.arm.com/tools-and-software/embedded/arm-compiler)

* 【收费】IAR编译器仅随IAR的IDE发布：[IAR](https://www.iar.com/iar-embedded-workbench/#!?architecture=Arm&currentTab=editions-and-licensing) 


ARM Compiler和IAR属于收费软件，结合ARM和IAR的IDE就能很方便的完成MCU的软件开发，这也是我们平时使用最多的方式。

* 【免费开源】ARM Cortex-M/R GNU工具链 [The GNU Toolchain for the Cortex-R/M](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads)

GNU Toolchain for the Cortex-R/M是基于GCC开发的，免费软件，适用于Cortex-R/M作为内核的MCU。

ST公司STM32CubeIDE就是基于GNU工具链的。

一般它们是这个样子的:
```
arm-none-eabi-gcc
arm-none-eabi-g++
arm-none-eabi-ar
arm-none-eabi-as

...
```

## 2. 适用于Cortex-A内核的编译器

 * 【收费】ARM Compiler(随ARM的IDE发布)： [Arm Development Studio](https://developer.arm.com/tools-and-software/embedded/arm-development-studio)

 * 【收费】ARM Compiler(单独发布)：[Arm Compiler](https://developer.arm.com/tools-and-software/embedded/arm-compiler)

 * 【收费】IAR编译器仅随IAR的IDE发布：[IAR](https://www.iar.com/iar-embedded-workbench/#!?architecture=Arm&currentTab=editions-and-licensing) 

ARM Compiler为收费软件，适用于ARM全系列内核。IAR为收费软件，主要支持Cortex-M核，也支持部分Cortex-A核。

 * 【免费开源】ARM Cortex-A GNU工具链 [The GNU Toolchain for the Cortex-A Family](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-a/downloads)

GNU Toolchain for the Cortex-A是基于GCC开发的，免费软件，适用于以Cortex-A作为内核的应用处理器。

* 【免费】[Android NDK](https://developer.android.google.cn/ndk)

Android NDK是免费软件，适用于编译Android Native(C/C++)应用程序。

## 3. GNU工具链

GNU工具链免费开源，在业界非常受欢迎。

针对ARM Cortex-M核进行开发时常用的是Keil和IAR，但是GNU工具链使用的也非常多，比如ST公司新推出的STM32CubeIDE。

但是针对ARM Cortex-A核进行开发时最常用的是GNU编译器，Android NDK使用的就是CNU工具链。

Cortex-A核一般用于复杂应用，通常都会使用Linux操作系统，所以Cortex-A核的编译器从用途上可分为两种：

* 编译裸机程序的编译器，比如编译Uboot和Linux。

```
arm-none-eabi-gcc
```

* 编译操作系统上应用程序的编译器，比如编译Linux应用程序。

```
arm-none-linux-gnueabihf-gcc
```

### 3.1 GNU for ARM编译器的命名规则

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


### 3.2 GNU For ARM的发布途径

GNU For ARM的发布途径主要有四种：

* [Linaro](https://www.linaro.org/)

* [GNU Toolchain For ARM](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain)

* 使用 [crosstool-ng](http://crosstool-ng.github.io/) 自己编译

* [Android NDK](https://developer.android.google.cn/ndk)


## 4. Clang For ARM

* [Arm Compiler 6](https://developer.arm.com/tools-and-software/embedded/arm-compiler)

现在ARM Compiler 6已经使用Clang作为编译器前端了，在最新版的Keil中就能使用。

![](../../../assets\images\EmbeddedSystem\arm_compiler\keil_arm_compiler6_clang.png)

* [Android NDK](https://developer.android.google.cn/ndk)

目前Android NDK也已经转投Clang。

### 4.1 Clang与GCC的关系

编译器是一套软件，一般分为编译器前端和编译器后端。

* 编译器前端：负责词法分析、语法分析、语义分析和生成中间代码。

* 编译器后端：负责代码优化和生成目标程序。

我们通常说的GCC是一套完整的编译器软件，包括编译器前端和后端。而Clang只是一个编译器前端，Clang由苹果公司开发，据说效率要比GCC高很多，Clang通常使用LLVM作为编译器后端。

![](../../../assets\images\EmbeddedSystem\arm_compiler\gcc_clang.png)
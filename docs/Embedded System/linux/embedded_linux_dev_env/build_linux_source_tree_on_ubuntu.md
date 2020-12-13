# 在Ubuntu中构建Linux内核源码树

编译Linux内核模块比如驱动程序是需要Linux内核源码的，并且是编译后的源码。

换句话说就是：编译Linux内核模块是需要Linux内核源码树的。

在Ubuntu（PC）中获取Linux源码树有两种方式：

* 1.使用Ubuntu系统自带的内核源码树
* 2.下载Linux内核源码编译安装

## 1.使用Ubuntu系统自带的内核源码树

### 1.1 查看你的系统使用的内核版本

```shell
$ uname -r

4.15.0-74-generic
```
### 1.2 在 /lib/modules/ 目录下找到相应的Linux内核源码树

```shell
$ ll /lib/modules/

4.15.0-101-generic/
4.15.0-106-generic/
4.15.0-20-generic/
4.15.0-74-generic/
4.15.0-76-generic/
```

### 1.3 编译一个内核模块验证环境正确性

[实现一个最简单的Linux驱动程序](#jump)


## 2.下载新的Linux内核源码编译安装

### 2.1 列出可用的源码包
```shell
sudo apt-cache search linux-source
```
Ubuntu会支持好几个版本的Linux内核


### 2.2 安装Linux内核源码

```shell
sudo apt-get install xx-xx-xx
```

安装后的源码在 /usr/src 目录中，是一个压缩包

### 2.3 安装编译源码所需的依赖库
```
sudo apt-get install build-essential libncurses5-dev libssl-dev
```

编译报错的话，注意查看报错信息，少哪个依赖库就安装哪个

### 2.4 编译源码

```
#清除编译过程中产生的所有中间文件
sudo make mrproper

#清理上一次产生的编译中间文件
sudo make clean

#配置后生成.config文件
sudo make menuconfig

#编译源码
sudo make
```

### 2.5 安装内核模块

```
sudo make modules_install
```

### 2.6 安装内核

```
sudo make install
```

### 2.7 启用内核作为引导

一旦 make install 命令完成了，就是时候将内核启用来作为引导。使用这个命令来实现：
```
sudo update-initramfs -c -k 4.17-rc2
```

当然，你需要将上述内核版本号替换成你编译完的。当命令执行完毕后，使用如下命令来更新 grub：

```
sudo update-grub
```

现在你可以重启系统并且选择新安装的内核了。


> 最后通过一个简单的驱动程序验证环境配置的正确与否

## 3.<span id="jump">实现一个最简单的Linux驱动程序</span>

* hello.c
```c
#include<linux/init.h>
#include<linux/kernel.h>
#include<linux/module.h>
MODULE_LICENSE("Dual BSD/GPL");
static int hello_init(void)
{
	printk(KERN_EMERG "Hello, Linux Driver!\n");
	return 0;	
}
static void hello_exit(void)
{
	printk(KERN_EMERG "Hello, Diver Exit!\n");	
}
module_init(hello_init);
module_exit(hello_exit);
```

* Makefile
```makefile
obj-m := hello.o
# it is linux kernel dir
KERNELDIR := /lib/modules/$(uname -r)/build
PWD :=$(shell pwd)
  
modules:  
	$(MAKE)  -C  $(KERNELDIR)  M=$(PWD)  modules
 
 .PHONY :clean
clean:
	rm -rf *.o *ko
```

* 安装模块
```
sudo  insmod  ./hello.ko
```

* 查看模块
```
sudo  lsmod 
```

* 移除模块

```
sudo  rmmod  hello
```

* 查看驱动程序的输出

因为驱动程序中使用的是Linux Kernel的printk函数，所以信息不回直接输出到终端，可以通过下面的程序查看。

```
dmesg
# or
dmesg | grep Hello

Hello ,Linux Driver!
Hello Diver Exit !
```
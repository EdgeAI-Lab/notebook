# 实现一个最简单的Linux驱动程序

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
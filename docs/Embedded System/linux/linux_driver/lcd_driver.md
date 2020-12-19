# Linux LCD驱动框架

* Linux内核统一抽象，fbmem.c会注册一个字符设备，该字符设备会生成/dev/fbx显示设备节点，并且包含open，write，read等函数对显示设备进行操作。通过fb_info去操作具体的显示设备。

* fb_info结构体包含了具体显示设备的必要物理信息。

* 所以我们需要去构造一个fb_info结构体，并通过register_framebuffer()函数将其注册。（其实就是加入一个链表）fbmem.c构造的字符设备会查询该链表，取出fb_info来使用。

* 所以编写LCD驱动程序，就是根据具体的显示设备参数去构造一个fb_info结构体，并通过register_framebuffer()函数进行注册。

* 因为是在内核层，所以我们自己编写的驱动程序必须是一个内核模块，但是并不一定需要生成设备节点（就是并不需要构造file_operations结构体），因为fbmem.c已经生成设备节点了。所以该驱动的架构可以是下面这样的：

```c

#include<linux/init.h>
#include<linux/kernel.h>
#include<linux/module.h>
MODULE_LICENSE("Dual BSD/GPL");
static int lcd_init(void)
{
	framebuffer_alloc(0, NULL);
    
    /* 设置 fb_info 结构体 */

    /* 设置LCD控制器参数 */

    /* 注册 fb_info 结构体 */
    register_framebuffer();

	return 0;	
}
static void lcd_exit(void)
{
	unregister_framebuffer();
    framebuffer_release();
}
module_init(lcd_init);
module_exit(lcd_exit);
```

* 编译上面所示驱动生成.ko文件，加载该ko文件之后，就会执行lcd_init()函数，从而构造并注册fb_info结构体。


------------------------

-----------------------------

* 以上的方法比较简单，但是并不规范，因为对于Linux驱动早期是“ 平台总线-设备-驱动模型 ”，现在一般是使用设备树。

* 所以如果使用“ 平台总线-设备-驱动模型 ”，我们可以通过编写平台设备.c和设备驱动.c来实现fb_info结构体的构造和注册。

[可参照最简单的设备 驱动 总线模型](ld_bus_dev_drv.md)

* 如果使用设备树，我们可以通过设备树配置和设备驱动.c来实现fb_info结构体的构造和注册。
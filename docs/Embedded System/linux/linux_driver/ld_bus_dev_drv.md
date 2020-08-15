# 设备 驱动 总线模型

* dev.c

```c
#include <linux/module.h>
#include <linux/platform_device.h>

static struct platform_device *mydev;

static int __init mydev_init(void)
{
	mydev = platform_device_alloc("mydev", -1);
	if(!mydev){
		return -ENOMEM;
	}

	platform_device_register(mydev);
	
	return 0;
}

module_init(mydev_init);



static void __exit mydev_exit(void)
{
	platform_device_unregister(mydev);
}

module_exit(mydev_exit);

MODULE_LICENSE("GPL v2");
```

* drv.c

```c
#include <linux/module.h>
#include <linux/types.h>
#include <linux/sched.h>
#include <linux/init.h>
#include <linux/cdev.h>
#include <linux/slab.h>
#include <linux/poll.h>
#include <linux/platform_device.h>
#include <linux/miscdevice.h>
#include <linux/of_device.h>


static int my_probe(struct platform_device *pdev)
{
	printk(KERN_DEBUG "my probe\n");
    return 0;
}


static int my_remove(struct platform_device *pdev)
{
	printk(KERN_DEBUG "my remove\n");
    return 0;
}


static struct platform_driver myDrv = {
	.driver = {
		.name = "mydev",
		.owner = THIS_MODULE,
	},

	.probe = my_probe,
	.remove = my_remove,
};


module_platform_driver(myDrv);

// 		module_platform_driver(xxx)；
// 		最终展开后就是如下形式：
// 		static int __init xxx_init(void)
// 		{
// 		        return platform_driver_register(&xxx);
// 		}
// 		module_init(xxx_init);
// 		static void __exit xxx_exit(void)
// 		{
// 		        return platform_driver_unregister(&xxx);
// 		}
// 		module_exit(xxx_exit);


MODULE_LICENSE("GPL v2");

```


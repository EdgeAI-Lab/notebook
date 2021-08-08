# Linux驱动pinctrl和GPIO子系统

* [RK3399 Pinctrl和GPIO子系统](https://wiki.t-firefly.com/zh_CN/Core-3399-JD4/driver_gpio.html)
* [RK3399 Pinctrl和GPIO子系统百度云备份，提取码：pzfn](https://pan.baidu.com/s/1YwFez3Zt1AXLQuyQhkFZww )

* [参考链接](https://www.gendiao98.com/thread-25650-1-1.html)
* [参考链接](https://blog.csdn.net/ggxyx123/article/details/86502195)
* [视频讲解-讲的不是很好](https://ke.qq.com/course/474079?taid=4043879213382623)

## 1. pinctrl子系统

pinctrl子系统其实是一个平台设备驱动。

pinctrl子系统与设备树完美配合，当设备树中存在相应的pinctrl节点时，将会被生成pinctrl平台设备，Linux内核中有相应的pinctrl平台驱动（通常由芯片SOC厂商实现），当pinctrl平台设备与pinctrl平台驱动匹配上后，就会调用pinctrl平台驱动的probe函数，将I/O配置放进一个pinctrl_dev类型的结构体中。



## 2. GPIO子系统



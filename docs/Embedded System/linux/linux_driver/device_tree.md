# 设备树相关

# pinctrl

而在调用票probe函数之前，驱动模型实际上已经申请过一次pin了，（前提是dts文件中该驱动节点中有定义名为“default”的pinctrl配置）。

驱动模型中调用driver的probe函数的地方:

```c
static int really_probe(struct device *dev, struct device_driver *drv)
{
	int ret = 0;
        ......
	/* If using pinctrl, bind pins now before probing */
	ret = pinctrl_bind_pins(dev); //对该device涉及的pin进行pin control相关设定
	if (ret)
		goto probe_failed;
 
	if (driver_sysfs_add(dev)) {
		printk(KERN_ERR "%s: driver_sysfs_add(%s) failed\n",
			__func__, dev_name(dev));
		goto probe_failed;
	}
 
	if (dev->bus->probe) { //下面是真正的probe过程。
		ret = dev->bus->probe(dev);
		if (ret)
			goto probe_failed;
	} else if (drv->probe) {
		ret = drv->probe(dev);
		if (ret)
			goto probe_failed;
	}
 
	driver_bound(dev);
	ret = 1;
	pr_debug("bus: '%s': %s: bound device %s to driver %s\n",
        .....
}
```

pinctrl_bind_pins函数定义:

```c
#define PINCTRL_STATE_DEFAULT "default"
#define PINCTRL_STATE_IDLE "idle"
#define PINCTRL_STATE_SLEEP "sleep"
```

```c
int pinctrl_bind_pins(struct device *dev)
{
	int ret;
 
	dev->pins = devm_kzalloc(dev, sizeof(*(dev->pins)), GFP_KERNEL);
	if (!dev->pins)
		return -ENOMEM;
 
	dev->pins->p = devm_pinctrl_get(dev); //获取pinctrl 
	if (IS_ERR(dev->pins->p)) {
		dev_dbg(dev, "no pinctrl handle\n");
		ret = PTR_ERR(dev->pins->p);
		goto cleanup_alloc;
	}
 
	dev->pins->default_state = pinctrl_lookup_state(dev->pins->p, //查找这个pin的default状态
					PINCTRL_STATE_DEFAULT);
	if (IS_ERR(dev->pins->default_state)) {
		dev_dbg(dev, "no default pinctrl state\n");
		ret = 0;
		goto cleanup_get;
	}
 
	ret = pinctrl_select_state(dev->pins->p, dev->pins->default_state);  //设置pin的default状态
	if (ret) {
		dev_dbg(dev, "failed to activate default pinctrl state\n");
		goto cleanup_get;
	}
 
	return 0;
```

从驱动模型的实现中，不难看出在驱动probe前，就已经申请到default的pin配置了，当然pinctrl的计数已经+1了。

Driver的probe函数可以通过devm_pinctrl_get获得pinctrl的句柄，再自行调用pinctrl_select_state设置pin state。
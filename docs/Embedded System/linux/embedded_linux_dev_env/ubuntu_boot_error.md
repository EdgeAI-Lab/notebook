# Ubuntu启动错误解决

错误信息：
home systemd-modules-load[278] could not open moddep file '/lib/modiles/5.0.0.-37-generic.modules.dep.bin'

解决方法：

```
sudo depmod
```

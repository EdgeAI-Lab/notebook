# Ubuntu启动错误解决

## 1.home systemd-modules-load[278]

错误信息：
```
home systemd-modules-load[278] could not open moddep file '/lib/modiles/5.0.0.-37-generic.modules.dep.bin'
```

解决方法：

```
sudo depmod
```

## 2.Stopping User Manager for UID 121

错误信息：

```
...
Stopping User Manager for UID 121
...
```

解决方案：

该启动错误是由于硬盘空间不足造成的。

`Alt+F3`开启新的终端，然后删除一些文件即可。



# Linux脚本启动顺序

较新版本的Linux系统与旧版本的Linux系统的脚本启动顺序，会有一定的差异：

* 在旧版本的Ubuntu系统中，Linux系统启动时第一个进程是/sbin/init，而/etc/inittab是/sbin/init的配置文件，在新版本的Ubuntu系统中，已不再使用/etc/inittab文件，取而代之的是/etc/init.d

* 比较新的Linux发行版已经没有rc.local文件了，因为已经将其服务化了

但是整体的脚本启动流程是有规则的，一般启动顺序是：

* 用户登录前
```
/sbin/init -> rcx.d
```

* 用户登录后

```
# /etc/profile执行时，会逐个调用/etc/profile.d中的脚本执行
/etc/profile /etc/profile.d
```


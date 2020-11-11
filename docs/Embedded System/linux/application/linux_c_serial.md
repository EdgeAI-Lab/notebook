# C语言操作串口

## 1.配置串口访问权限

首先确定使用的串口设备文件：

```
$ ll /dev/ttyU*

crw-rw---- 1 root dialout 188, 0 Nov 11 14:22 /dev/ttyUSB0
```

一般普通用户是没有权限直接访问串口设备的，有两种处理方式：

* 临时修改串口设备文件的访问权限

```
sudo chmod 777 /dev/ttyUSB0
```

配置后立即生效

* 将当前用户添加进 dialout 用户组

命令格式：

```
usermod -aG {group-name} username
```

eg:
```
sudo usermod -aG dialout your_user_name
```

查看是否设置成功：

```
$ grep 'dialout' /etc/group
```

配置后重启生效

## 2.打开并配置串口

```c
int fd = open("/dev/ttyUSB0",O_NONBLOCK);
```
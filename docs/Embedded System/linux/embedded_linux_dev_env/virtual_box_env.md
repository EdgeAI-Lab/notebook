# VirtualBox开发环境搭建


## 一、 VirtualBox与Windows共享剪切板

实现共享剪切板功能只需三步，如下：

### 1.1 使能共享剪切板和拖拽文件功能

![](../../../assets\images\EmbeddedSystem\linux\embedded_linux_dev_env\virtual_box_env\virtualbox_windows_shared_clipboard.png)

### 1.2 安装插件

![](../../../assets\images\EmbeddedSystem\linux\embedded_linux_dev_env\virtual_box_env\virtualbox_install_additions.png)

### 1.3 重启Ubuntu

重启系统之后，设置才能生效。

重启后请卸载掉“Guest Additions.iso”光盘。

### 1.4 可能遇到的问题

如果挂载“Guest Additions.iso”光盘后再次挂载，VirtualBox会报错崩溃，并且导致无法再次启动系统。报错信息如下：

```
Cannot attach medium 'C:\Program Files\Oracle\VirtualBox\VBoxGuestAdditions.iso'...
```

此时使用文本编辑器打开虚拟机文件xxx.vbox，将下面这个删除：

```xml
<DVDImages>
    <Image uuid="{49c18a29-332b-4b24-b7e5-d88f63fd4733}" location="C:/Program Files/Oracle/VirtualBox/VBoxGuestAdditions.iso"/>
    ...
</DVDImages>
```

## 二、 VirtualBox双网卡配置

电脑有两块物理网卡，请按照下面步骤操作：

### 2.1 桥接到无线网卡
![](../../../assets\images\EmbeddedSystem\linux\embedded_linux_dev_env\virtual_box_env\virtualbox_2_net_adapter01.png)

### 2.2 桥接到有线网卡
![](../../../assets\images\EmbeddedSystem\linux\embedded_linux_dev_env\virtual_box_env\virtualbox_2_net_adapter02.png)

### 2.3 配置IP

用来上网的网卡使用默认的DHCP自动分配IP即可

连接开发板的有线网卡配置为静态IP，不要设置网关（直连的话）

## 三、共享文件夹配置

### 3.1 手动挂载

* 设置Windows下要共享的文件夹

首先将虚拟机（Guest OS）关闭，然后做如下设置：

![](../../../assets\images\EmbeddedSystem\linux\embedded_linux_dev_env\virtual_box_env\sf01.png)

设置完成后启动虚拟机（Guest OS）

* 在Ubuntu中挂载共享文件夹

```bash
# 命令行手动挂载
sudo mount -t vboxsf sharename mountpoint

# 开机自动挂载 
# 在/etc/fstab末尾添加
sharename mountpoint vboxsf defaults 0 0

```

[VirtualBox共享文件夹官方文档](https://www.virtualbox.org/manual/ch04.html#sharedfolders)，手动挂载共享文件夹节选：

```bash
# In a Linux guest, use the following command:

mount -t vboxsf [-o OPTIONS] sharename mountpoint

# To mount a shared folder during boot, add the following entry to /etc/fstab:

sharename   mountpoint   vboxsf   defaults  0   0

```

### 3.2 自动挂载

自动挂载到/media目录，且文件的权限是 root vboxsf，使用起来非常不方便，所以不建议使用自动挂载。

![](../../../assets\images\EmbeddedSystem\linux\embedded_linux_dev_env\virtual_box_env\sf02.png)



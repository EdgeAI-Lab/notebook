# 1. 安装NFS服务

```
sudo apt-get install nfs-kernel-server
```

# 2. 修改它的配置文件/etc/exports，增加NFS服务访问目录
![nfs](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTYwNjIxMTQzNzEzMTIx?x-oss-process=image/format,png)

在/etc/exports末尾添加如下内容：  

```
/home/book/fhc/nfs *(rw,sync,no_root_squash,no_subtree_check)
```

以后就可以通过NFS访问目录 /home/book/fhc/nfs，当然你可以添加多个目录。

**参数说明：**

* 格式：<输出目录> [client1 (选项)] [client2 (选项)]

**Eg:**
```
# 将/home/xxx/nfs目录暴露给NFS客户端192.168.2.100
/home/xxx/nfs 192.168.2.100/24(rw,sync,no_root_squash,no_subtree_check)

# 将/home/xxx/nfs目录暴露给任意NFS客户端
/home/xxx/nfs *(rw,sync,no_root_squash,no_subtree_check)

```
* rw：读写权限
* sync：同步模式，内存中数据时时写入磁盘
* no_root_squash：当NFS客户端以root身份访问时，映射为NFS服务器的root用户
* no_subtree_check：不检查父目录权限 

# 3. 重启NFS服务

```
sudo /etc/init.d/nfs-kernel-server restart
```

# 4. 查看NFS服务状态
```
sudo /etc/init.d/nfs-kernel-server status
```

# 5. 开发板挂载NFS目录

## 5.1 开发板启动Linux系统后，在Linux系统中挂载

```
mount -t nfs -o nolock 192.168.2.200:/home/book/fhc/nfs /mnt
```
参数介绍：

* mount：Linux系统中挂载文件系统的指令，卸载是umount
* -t nfs：文件系统类型为nfs
* -o nolock：不加锁
* 192.168.2.200：nfs服务端IP
* /home/book/fhc/nfs：nfs服务端暴露的文件夹
* /mnt：nfs客户端挂载点



## 5.2 在linux内核启动时挂载（u-boot中设置启动参数）

```
setenv bootargs root=/dev/nfs nfsroot=192.168.10.110:/home/xxx/nfs ip=192.168.10.122 init=/linuxrc console=ttySAC0,115200
```
# VSCode通过SSH连接服务器实现远程编辑

* 首选服务器端要安装SSH服务并启动，方法参考： [SSH服务器搭建](../../Embedded%20System/linux/embedded_linux_dev_env/ssh_server.md)

* 在VSCode中安装Remote-SSH插件

* 添加配置文件

Ctrl + Shift + p然后输入ssh，选择Remote-SSH：Connect to host，然后选择 Configure SSH Hosts 或者 Add New Host

```
Host 65.49.218.156
  HostName 65.49.218.156
  User fhc
  Port 28650
```
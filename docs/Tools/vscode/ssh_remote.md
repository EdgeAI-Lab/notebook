# VSCode通过SSH连接服务器实现远程编辑

* 安装Remote-SSH插件


* 添加配置文件

Ctrl + Shift + p然后输入ssh，选择Remote-SSH：Connect to host，然后选择 Configure SSH Hosts 或者 Add New Host

```
Host 65.49.218.156
  HostName 65.49.218.156
  User fhc
  Port 28650
```
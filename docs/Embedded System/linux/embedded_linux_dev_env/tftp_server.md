# TFTP

TFTP: Trivial File Transfer Protocol.

u-boot中会使用到tftp协议（注意！不是FTP协议）。

## 1. 安装TFTP服务

```
sudo apt install tftpd-hpa
```

## 2. 配置TFTP

```
sudo vim /etc/default/tftpd-hpa
```

## 3. 启动TFTP服务

```
$ sudo systemctl enable tftpd-hpa
$ sudo systemctl restart tftpd-hpa
```

```
sudo service tftpd-hpa start
sudo service tftpd-hpa stop

sudo service tftpd-hpa restart	// to restart, or use 'stop', or 'start' as needed.
```

## 4. 检查TFTP运行状态

```
sudo service tftpd-hpa status
```
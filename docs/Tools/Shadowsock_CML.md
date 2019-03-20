## 命令行配置Shadowsocks并使用

### 1.安装Shadowsocks
```bash

# Ubuntu16.10及以上
sudo apt-get install shadowsocks

```
### 2.配置Shadowsocks
```bash
sudo vim /etc/shadowsocks/config.json 

```



### 3.安装proxychains4
```bash
sudo apt-get install proxychains4

```

### 4.修改proxychains4配置文件
```bash
# 打开配置文件
sudo vim /etc/proxychains4.conf

# 在文件末尾添加
socks5 127.0.0.1 1080

```

### 5.测试

大功告成，测试一下。

!!! Warning
    不能用ping命令测试，因为proxychains只支持使用tcp或udp协议的程序。
	ping用的是ICMP协议，不以tcp或udp为基础，所以用不了。

```bash
proxychains4 curl www.google.com
```



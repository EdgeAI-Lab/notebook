# ShadowsocksR Server For Ubuntu

## 1. 获取一键安装脚本

```
wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocksR.sh
```

## 2. 执行一键安装

根据提示设置即可。

```
chmod +x shadowsocksR.sh

./shadowsocksR.sh 2>&1 | tee shadowsocksR.log
```

## 3. 修改SSR server配置

修改配置：

```
vim /etc/shadowsocks.json
```
重启SSR server服务

```
/etc/init.d/shadowsocks restart
```



## 4. BBR

[去这里看吧！](https://www.tipsforchina.com/how-to-setup-a-fast-shadowsocks-server-on-vultr-vps-the-easy-way.html#install)
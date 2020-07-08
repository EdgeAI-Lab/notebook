# NanoPC RK3399

## 1. 命令行连接WiFi

* 切换到root账户
```
$ su root
```
* 查看网络设备列表
```
$ nmcli dev
```
注意，如果列出的设备状态是 unmanaged 的，说明网络设备不受NetworkManager管理，你需要清空 /etc/network/interfaces下的网络设置,然后重启.

* 开启WiFi
```
$ nmcli r wifi on
```
* 扫描附近的 WiFi 热点
```
$ nmcli dev wifi
```
* 连接到指定的 WiFi 热点
```
$ nmcli dev wifi connect "SSID" password "PASSWORD" ifname wlan0
```
请将 SSID和 PASSWORD 替换成实际的 WiFi名称和密码。
连接成功后，下次开机，WiFi 也会自动连接。

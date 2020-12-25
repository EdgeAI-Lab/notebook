# Linux命令行连接WiFi

## 1. 使用nmcli命令连接WiFi

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


假如NetworkManager无法运行：

```
Error: NetworkManager is not running.
```

可以尝试使用wap_xxx指令，使用方法如下：

## 2. 用wap_xxx命令连接WiFi

```
$ export SSID="VincrossGuest"
$ export PASSWORD="vincross"
 
$ ifconfig wlan1 up
$ wpa_passphrase ${SSID} ${PASSWORD} > /etc/wpa_supplicant/${SSID}.conf
$ wpa_supplicant -i wlan1 -c /etc/wpa_supplicant/${SSID}.conf -B
$ dhclient wlan1
$ ifconfig
```

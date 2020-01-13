# EasyDarwin RTSP

## 1.EasyDarwin
* [下载地址EasyDarwin](https://github.com/EasyDarwin/EasyDarwin)
* 启动EasyDarwin（注意关闭VPN）

后台访问地址：
```
http://localhost:10008
```

## 2.使用FFMPEG推流

* 单次推流
```
# 其中192.168.1.13为运行EasyDarwin服务的电脑
ffmpeg -re -i test.mp4 -rtsp_transport tcp -vcodec h264 -f rtsp rtsp://192.168.1.13:554/test
```

* 循环推流
```
# 其中192.168.1.13为运行EasyDarwin服务的电脑
ffmpeg -re -stream_loop -1 -i test.mp4 -rtsp_transport tcp -vcodec h264 -f rtsp rtsp://192.168.1.13:554/test
```

* 登录

```
mind login ywj@vincross.com 12345678
```



* 推流
```
ffmpeg -f v4l2 -channel 0 -video_size 640x480 -i /dev/video0 -pix_fmt nv12 -r 30 -vcodec libx264 -rtsp_transport udp -f rtsp rtsp://192.168.1.251:554/xrb
```

硬编码

```
libx264 --> cedrus264
```

* 拉流地址
```
rtsp://192.168.1.251:554/xrb
```
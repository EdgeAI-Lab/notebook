# FFMPEG常用命令

## 1. Linux下使用FFMPEG命令录音

* 查看声卡设备
```bash

cat /proc/asound/cards

```

* FFMPEG录音命令

[FFMPEG官方文档](http://ffmpeg.org/ffmpeg-devices.html#alsa)

```bash

hw:CARD[,DEV[,SUBDEV]]

ffmpeg -f alsa -i hw:0 alsaout.wav

```

* FFMPEG录像命令
```bash
// record
ffmpeg -f video4linux2 -s 320*300 -i /dev/video0 test.asf

// play
ffplay test.asf

// record and play
ffplay -f video4linux2 -framerate 30 -video_size hd720 /dev/video0


```



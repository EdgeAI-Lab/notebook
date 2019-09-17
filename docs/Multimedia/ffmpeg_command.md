# FFMPEG常用命令

## 参考文档
* [声卡-FFMPEG官方文档](http://ffmpeg.org/ffmpeg-devices.html#alsa)


## 常用命令

```bash
# 查看声卡设备
cat /proc/asound/cards

# FFMPEG录音命令
hw:CARD[,DEV[,SUBDEV]]

ffmpeg -f alsa -i hw:0 alsaout.wav

# record
ffmpeg -f video4linux2 -s 320*300 -i /dev/video0 test.asf

# play
ffplay test.asf

# record and play
ffplay -f video4linux2 -framerate 30 -video_size hd720 /dev/video0

# FFMPEG 从MP4中抽取H264文件
ffmpeg -i test.mp4 -an -vcodec libx264 -crf 23 test.h264
ffmpeg -i test.mp4 -codec copy -bsf h264_mp4toannexb -f h264 test.h264

# FFMPEG为视频添加Log
ffmpeg -i linuxidc.mp4 -i linuxidc.com.png -filter_complex overlay linuxidc.com.mp4

# FFMPEG以帧的方式查看MP4封装信息
ffprobe  -i example.mp4 -print_format json -show_frames

# FFMPEG查看YUV图像 / YUV视频
# 图片的尺寸必须写对，否则可能无法正常播放
ffplay -video_size 1280x720 test.yuv


```


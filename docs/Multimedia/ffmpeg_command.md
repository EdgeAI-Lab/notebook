# FFMPEG常用命令

## 参考文档
* [声卡-FFMPEG官方文档](http://ffmpeg.org/ffmpeg-devices.html#alsa)

## FFMPEG的安装方式

* Ubuntu中通过``` sudo apt-get install ffmpeg ``` 安装
* Ubuntu中通过源码编译安装
* Windows直接使用[FFMPEG官方预编译版本](https://ffmpeg.zeranoe.com/builds/)


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

# mp4转flv
ffmpeg -i example.mp4 -c:v libx264 -crf 24 example.flv

## FFMPEG视频HLS推流
ffmpeg -re -i example.flv -vcodec copy -acodec copy -f flv rtmp://localhost:1935/hls/stream

# FFMPEG摄像头HLS推流
ffmpeg -f video4linux2 -i /dev/video0 -c:v libx264 -preset ultrafast  -acodec libmp3lame -ar 44100 -ac 1  -f flv rtmp://localhost:1935/hls/stream


# FFMPEG 从MP4中抽取音频并保存为MP3文件
# 参数解释：
#  -i 表示input，即输入文件
#  -f 表示format，即输出格式
#  -vn表示vedio not，即输出不包含视频
#

fmpeg -i example.mp4 -f mp3 -vn example.mp3

# FFMPEG切割MP3文件
# 参数解释：
#  -i 表示input，即输入文件
#  -ss 开始切割时间点
#  -t 需要切割的时长

# 从1分00秒开始，切割50秒
ffmpeg -i input.mp3 -ss 00:01:00 -t 00:00:50 -acodec copy output.mp3

```

## 命令参数

|参数|含义|
|----|----|
|-f |强迫采用格式fmt
|-i |filename 输入文件
|-s |size 设置帧大小 默认是160x128
|-r |设置帧频，默认25  （待验证，确认非标准桢率会导致音画不同步，所以只能设定为15或者29.97）
|-ab |bitrate设置音频码率
|-ar |freq 设置音频采样率
|-ac |channels设置通道，默认为1
|-vd |device 设置视频捕获设备 eg:/dev/video0
|-av |device 设置音频设备 eg:/dev/dsp
|-vcodec|


c:v is an abbreviated version of codec:v

vcodec is an alias of codec:v

So all 3 function the same, but are not limited to 'copy' only. It is used to specify the codec, or copy.

For example

ffmpeg -i INPUT -map 0 -c:v libx264 -c:a copy OUTPUT

encodes all video streams with libx264 and copies all audio streams.

This could also be written as

ffmpeg -i INPUT -map 0 -codec:v libx264 -acodec copy OUTPUT

or

ffmpeg -i INPUT -map 0 -vcodec libx264 -codec:a copy OUTPUT
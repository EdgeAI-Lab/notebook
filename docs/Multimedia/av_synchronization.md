# 音视频同步

## 1. 时间戳

* DTS: decoding time stamp 解码时间戳
* PTS: presentation time stamp 显示时间戳

视频采用H264编码，其解码和显示顺序可能是不一样的，所以其DTS和PTS是不一样的；音频不存在这个问题，音频的DTS和PTS是一样的，对于音频通常我们只说PTS。



### 1.1 音频时间戳

* frame_size: 音频帧的大小，音频的帧是以时间为单位的，比如2.5, 5, 10, 20, 40 or 60 ms
* frame_byte_size：一帧音频按照字节存储的大小
* sample_rate: 音频的采样率，常用的有：8000,16000,44100,48000
* sample_resolution：采样位数
* channel_num：通道数
* time_interval: 时间间隔，可以理解为播放frame_size大小的音频数据需要的时间
* pts: 时间戳

```
time_interval(ms) = frame_byte_size/channel_num/(sample_resolution/8) * 1000 / sample_rate (ms)

pts(ms) = audio_index++ * time_interval (ms)
        = audio_index++ * (frame_size * 1000) / sample_rate (ms)

```
eg:  

```
48k 2ch 16bit  frame size 为10ms  
```

那么  

```
frame_byte_size = 10ms/1000ms * 48k = 480 byte  
channel_num = 2  
sample_resolution = 16

time_interval(ms)  
= frame_byte_size/channel_num/(sample_resolution/8) * 1000 / sample_rate (ms)  
= 480/2/(16/2)*1000/48000 (ms)

```





### 1.2 视频时间戳

* fps: 视频帧率

```

pts(ms) = video_index++ * 1000 / fps (ms)

```
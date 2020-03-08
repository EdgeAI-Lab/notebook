# 音视频同步

## 1. 时间戳

* DTS: decoding time stamp 解码时间戳
* PTS: presentation time stamp 显示时间戳

视频采用H264编码，其解码和显示顺序可能是不一样的，所以其DTS和PTS是不一样的；音频不存在这个问题，音频的DTS和PTS是一样的，对于音频通常我们只说PTS。



### 1.1 音频时间戳

* frame_size: 音频帧的大小，也就是一段特定时长的音频，比如2.5, 5, 10, 20, 40 or 60 ms，一般是采样的时候用这个名词
* time_interval: 时间间隔，播放一帧音频数据需要的时间，大小与frame_size相等，一般是播放的时候用这个名词
* frame_byte_size：一帧音频按照字节存储的大小

例如： 

```
48k 2ch 16bit  frame_size 为 10ms  
```

那么一帧数据（10ms）所占用的存储空间是：  

```c
frame_byte_size = (frame_size/1000ms) * 48k * channel_num * (sample_resolution/8)
                = (10ms/1000ms) * 48K * 2 * 2
                = 1920 Byte
```

* sample_rate: 音频的采样率，常用的有：8000,16000,44100,48000
* sample_resolution：采样位数
* channel_num：通道数



* pts: 时间戳

```c
// sample_resolution/8：如果采样位数是16 bit，那么就是16/8=2 Byte
time_interval(ms) = frame_byte_size/channel_num/(sample_resolution/8) * 1000 / sample_rate (ms)

pts(ms) = audio_index++ * time_interval (ms)
        = audio_index++ * frame_size (ms)

```


--------------------

例如：  

```
48k 2ch 16bit  frame_size 为10ms  
```

那么一帧数据（10ms）所占用的存储空间是： 

```c
frame_byte_size = (frame_size/1000ms) * 48k * channel_num * (sample_resolution/8)
                = (10ms/1000ms) * 48K * 2 * 2
                = 1920 Byte
```

反过来说，假如：

```
一段音频数据的大小是1920 Byte，其采样参数是：48k 2ch 16bit
```

那么这段音频的大小（时长）是：
```
frame_size(ms)
= frame_byte_size/channel_num/(sample_resolution/8) * 1000 / sample_rate (ms)  
= 1920/2/(16/8)*1000/48000 (ms)
= 10ms
```




### 1.2 视频时间戳

* fps: 视频帧率

```

pts(ms) = video_index++ * 1000 / fps (ms)

```

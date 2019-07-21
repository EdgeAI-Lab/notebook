# Ubuntu编译ijkplayer

## 1.安装依赖工具

[参考链接1](https://blog.csdn.net/qq372848728/article/details/62170288)

[参考链接2](https://github.com/bilibili/ijkplayer)

```bash

sudo apt install git
sudo apt install yasm

```

## 2.安装Android NDK工具链

* 建议使用ijkplayer官方使用的版本
[Android NDK, Revision 10e (May 2015)](https://developer.android.google.cn/ndk/downloads/older_releases.html)

* 下载完成之后解压并设置环境变量

```bash

# add these lines to your ~/.bash_profile or ~/.profile
export ANDROID_SDK=<your sdk path>
export ANDROID_NDK=<your ndk path>

export PATH=$ANDROID_SDK:$ANDROID_NDK:$PATH

```
添加之后执行 ```source .profile```立即生效

* 测试Android NDK工具链是否安装成功
```bash

ndk-build

```

## 3.修改支持RTSP

* vim ijkplayer-android/config/module-lite.sh

```vim

export COMMON_FF_CFG_FLAGS="$COMMON_FF_CFG_FLAGS --enable-protocol=rtp"  //修改
export COMMON_FF_CFG_FLAGS="$COMMON_FF_CFG_FLAGS --enable-protocol=tcp"  //添加
export COMMON_FF_CFG_FLAGS="$COMMON_FF_CFG_FLAGS --enable-demuxer=rtsp"  //添加

```
* vim ijkplayer-android/ijkmedia/ijkplayer/ff_ffplay.c

```c

//修改后的函数
static int packet_queue_get_or_buffering(FFPlayer *ffp, PacketQueue *q, AVPacket *pkt, int *serial, int *finished)
{
    while (1) {
    int new_packet = packet_queue_get(q, pkt, 1, serial);
    if (new_packet < 0)
    {
        new_packet = packet_queue_get(q, pkt, 0, serial);
        if(new_packet < 0)
        return -1;
    }
    else if (new_packet == 0) {
        if (!finished)
            ffp_toggle_buffering(ffp, 1);
        new_packet = packet_queue_get(q, pkt, 1, serial);
        if (new_packet < 0)
            return -1;
    }
    if (*finished == *serial) {
        av_free_packet(pkt);
        continue;
    }
    else
        break;
    }
    return 1;
}

```

## 4.编译

* 编译
```bash

cd ijkplayer-android/android/contrib

./compile-ffmpeg.sh clean
./compile-ffmpeg.sh all

cd ..
./compile-ijk.sh all

```
* 将ijkplayer项目导入Android studio
```
# Android Studio:
#     Open an existing Android Studio project
#     Select android/ijkplayer/ and import

```


## 5.配置ijkplayer相应参数，解决卡顿、延迟

[参考链接](https://blog.csdn.net/u013270727/article/details/83900062)

```java

// 支持硬解 1：开启 O:关闭
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "mediacodec-hevc", 1);
// 设置播放前的探测时间 1,达到首屏秒开效果
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "analyzeduration", 1);

/**
* 播放延时的解决方案
*/
// 如果是rtsp协议，可以优先用tcp(默认是用udp)
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "rtsp_transport", "tcp");
// 设置播放前的最大探测时间 （100未测试是否是最佳值）
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "analyzemaxduration", 100L);
// 每处理一个packet之后刷新io上下文
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "flush_packets", 1L);
// 需要准备好后自动播放
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "start-on-prepared", 1);
// 不额外优化（使能非规范兼容优化，默认值0 ）
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "fast", 1);
// 是否开启预缓冲，一般直播项目会开启，达到秒开的效果，不过带来了播放丢帧卡顿的体验
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "packet-buffering",  0);
// 自动旋屏
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "mediacodec-auto-rotate", 0);
// 处理分辨率变化
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "mediacodec-handle-resolution-change", 0);
// 最大缓冲大小,单位kb
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "max-buffer-size", 0);
// 默认最小帧数2
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "min-frames", 2);
// 最大缓存时长
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER,  "max_cached_duration", 3); //300
// 是否限制输入缓存数
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER,  "infbuf", 1);
// 缩短播放的rtmp视频延迟在1s内
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "fflags", "nobuffer");
// 播放前的探测Size，默认是1M, 改小一点会出画面更快
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "probesize", 200); //1024L)
// 播放重连次数
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER,"reconnect",5);
// TODO:
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "http-detect-range-support", 0);
// 设置是否开启环路过滤: 0开启，画面质量高，解码开销大，48关闭，画面质量差点，解码开销小
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_CODEC, "skip_loop_filter", 48L);
// 跳过帧 ？？
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_CODEC, "skip_frame", 0);
// 视频帧处理不过来的时候丢弃一些帧达到同步的效果
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_PLAYER, "framedrop", 5);

/* 暂未使用
// 超时时间，timeout参数只对http设置有效，若果你用rtmp设置timeout，ijkplayer内部会忽略timeout参数。rtmp的timeout参数含义和http的不一样。
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "timeout", 10000000);
// 因为项目中多次调用播放器，有网络视频，resp，本地视频，还有wifi上http视频，所以得清空DNS才能播放WIFI上的视频
ijkMediaPlayer.setOption(IjkMediaPlayer.OPT_CATEGORY_FORMAT, "dns_cache_clear", 1);
*/

```







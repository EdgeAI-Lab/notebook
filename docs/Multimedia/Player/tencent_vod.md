# 腾讯VOD服务使用

其实就相当于一个Nginx服务器，会为存储在其中的每个视频生成一个URL，然后Android客户端就可以访问这个URL边下边播。这么使用几乎是免费的，除非视频的量非常大。

但是对于长视频来说这么访问速度会比较慢，想要加速就需要使用腾讯VOD的CDN加速服务。

当然，腾讯VOD也提供了视频转码服务，比如MP4转HLS流，这是收费服务，并且贵。



* Android端获取视频的分类及视频信息（视频URL，视频封面URL等）

使用 [API 3.0 Explorer 登录后访问](https://console.cloud.tencent.com/api/explorer?Product=vod&Version=2018-07-17&Action=PullEvents&SignVersion=)在线调试，就能理解了

获取视频分类接口 -> 视频分类相关接口

视频信息（视频URL，视频封面URL等）-> 媒资管理相关接口





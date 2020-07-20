# 为JZ2440准备具有设备树的内核

## 1.获取所需的文件
在编译u-boot和kernel时, 我们可以使用新的工具链, 
只要这个工具链支持ARM9的指令集(armv4)就可以(这通常可以通过编译参数来指定使用特定的指令集).
工具链可以从某些网站上下载，并不需要自己去制作。
比如可以访问这个网站: https://releases.linaro.org/components/toolchain/binaries/4.9-2017.01/arm-linux-gnueabi/

下载: gcc-linaro-4.9.4-2017.01-x86_64_arm-linux-gnueabi.tar.xz

但是在制作根文件系统时, 实际上我们是编译各种APP, 
这些APP要用到一些动态库, 为了方便一般直接使用工具链中lib目录里的库。
新版工具链的lib库一般是支持新的芯片，比如cortex A7,A8,A9，并不支持ARM9。
所以在制作根文件系统、编译APP时我们还得使用比较老的工具链: arm-linux-gcc-4.3.2.tar.bz2

|名称|链接|说明|
|----|----|---|
|arm-linux-gcc-4.3.2|链接：https://pan.baidu.com/s/1aXEAz8ljwMabEOpuhPugsQ 提取码：bfr5|
|gcc-linaro-4.9.4-2017.01-x86_64_arm-linux-gnueabi|链接：https://pan.baidu.com/s/15cBI60LcQzgYAf19ytPnOg 提取码：3tso |
|u-boot+设备树支持补丁|链接：https://pan.baidu.com/s/1XjDFNuI1y1fFAKRr5GFElQ 提取码：7vi5|
|linux内核+设备树支持补丁|链接：https://pan.baidu.com/s/1GuUUHSd068xblLH8JAXMAA 提取码：rdft |
|根文件系统|链接：https://pan.baidu.com/s/11nYC5wFzmget9lHI5b0iBw 提取码：ib2o|


## 2.编译uboot和kernel

注：文件系统直接使用第一步获取的文件系统即可


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

|名称|链接|
|----|----|
|arm-linux-gcc-4.3.2|链接：https://pan.baidu.com/s/1aXEAz8ljwMabEOpuhPugsQ 提取码：bfr5|
|gcc-linaro-4.9.4-2017.01-x86_64_arm-linux-gnueabi|链接：https://pan.baidu.com/s/15cBI60LcQzgYAf19ytPnOg 提取码：3tso |
|u-boot+设备树支持补丁|链接：https://pan.baidu.com/s/1XjDFNuI1y1fFAKRr5GFElQ 提取码：7vi5|
|linux内核+设备树支持补丁|链接：https://pan.baidu.com/s/1GuUUHSd068xblLH8JAXMAA 提取码：rdft |
|根文件系统|链接：https://pan.baidu.com/s/11nYC5wFzmget9lHI5b0iBw 提取码：ib2o|


## 2.编译uboot和kernel

注：文件系统直接使用第一步获取的文件系统即可

### 2.1 工具链环境变量配置

使用哪一个工具链就将其配置到PATH

```
export PATH=$PATH:/path/to/your_toolchain_path
```

### 2.2 编译u-boot

* 解压u-boot

```
tar xjf u-boot-1.1.6.tar.bz2
```

* 打补丁
```
cd u-boot-1.1.6

patch -p1 < ../u-boot-1.1.6_device_tree_for_jz2440.patch
```

* 配置编译
```
make 100ask24x0_config
make  
```

### 2.3 编译kernel

* 查看系统中是否有mkimage
```
# whereis mkimage

mkimage:
```

如果系统中没有mkimage，则将 u-boot_root_dir/tools/mkimage 文件（u-boot编译后会生成该文件）复制到 /bin/mkimage 即可。

* 安装依赖文件
```
sudo apt-get install flex bison bc
```


* 解压内核

```
 tar -xvf linux-4.19-rc3.tar.gz 
```

* 打补丁

```
cd linux-4.19-rc3                  
patch -p1 < ../linux-4.19-rc3_device_tree_for_jz2440.patch
```

* 配置并编译内核

```
cp config_ok .config

# arch/arm/boot/uImage
make uImage

# arch/arm/boot/dts/jz2440.dtb
make dtbs 
```


# 定制Android启动Logo

## 一、定制Linux kernel启动Logo

* 安装PPM图片制作工具
```
sudo apt-get install netpbm
```

* 编写PPM图片制作脚本 make_ppm.sh


```shell
pngtopnm logo.png > logo_linux.pnm
pnmquant 224 logo_linux.pnm > logo_linux_224.pnm
pnmtoplainpnm logo_linux_224.pnm > logo_linux_clut224.ppm
rm -f logo_linux.pnm logo_linux_224.pnm
```



* 准备Logo图片，并命名为logo.png(因为ppm制作脚本中是这个名字)


* 制作ppm格式的Logo

```
./make_ppm.sh logo.png

```
执行上面的命令后，会在当前文件夹生成 logo_linux_clut224.ppm



* 拷贝到制作好的LOGO文件到  /drivers/video/logo 文件夹，替换 logo_linux_clut224.ppm 文件，删除该文件夹下的logo_linux_clut224.c 和 logo_linux_clut224.o

* Logo居中全屏显示

  修改源码/drivers/video/fbdev/core/fbmem.c中的fb_show_logo_line函数
    
```
//image.dx=0;
//image.dy=y;
image.width = logo->width;
image.heigh = logo->height;
    
//增加如下内容
+image.dx = (info->var.xres / 2) - (image.width / 2);
+image.dy = (info->var.yres / 2) - (image.height / 2);
```

   
  修改源码/drivers/video/console/fbcon.c中的fbcon_prepare_logo()函数

  在logo_height = fb_prepare_logo(info, ops->rotate);后增加下面一行代码
     
```
+logo_height += (info->var.yres / 2) - (logo_height / 2);
```

* 去除开机Logo上的光标
 
在 drivers/video/console/fbcon.c 中将函数 tatic void fb_flashcursor(void *private) 和 static void fbcon_cursor(struct vc_data *vc, int mode) 修改为空函数既可。



## 二、定制Android启动初始化Logo
在 /system/core/init/init.cpp（天嵌科技提供的Android6.0的源码）中的函数console_init_action(int nargs, char **args)负责向控制台输出 "Android"字样。如果不希望显示 "Android" 字样，将函数中的相关部分注释掉既可。



## 三、定制Android图形系统启动动画

#### 3.1 这是Android第三个开机画面，有两种选择：

* Android 默认的开机画面（闪动的ANDROID大字）

* 用户自定义的开机画面（bootanimation.zip）


#### 3.2 Android启动时是如何判断该使用哪一个开机画面呢？
Android启动时回去检测是否存在 system/media/bootanimation.zip，如果存在则使用这个开机画面，否则使用Android默认开机画面。

#### 3.3 定制bootanimation.zip

```
600 480 24    // 图片大小为600x480，显示速度为24帧每秒（必须根据自己的实际情况写）
p   1   0   part1  
p   0   10  part2  

```
第一行的三个数字分别表示开机动画在屏幕中的显示宽度、高度以及帧速（fps）。剩余的每一行都用来描述一个动画片断，这些行必须要以字符“p”来开头，后面紧跟着两个数字以及一个文件目录路径名称。第一个数字表示一个片断的循环显示次数，如果它的值等于0，那么就表示无限循环地显示该动画片断。第二个数字表示每一个片断在两次循环显示之间的时间间隔。这个时间间隔是以一个帧的时间为单位的。文件目录下面保存的是一系列png文件，这些png文件会被依次显示在屏幕中。


以上面这个desct.txt文件的内容为例，它描述了一个大小为600x480的开机动画，动画的显示速度为24帧每秒。这个开机动画包含有两个片断part1和part2。片断part1只显示一次，它对应的png图片保存在目录part1中。片断part2无限循环地显示，其中，每两次循环显示的时间间隔为10 x (1 / 24)秒，它对应的png图片保存在目录part2中。

#### 需要特别注意的地方
* desc.txt 文件要在 Linux 环境下生成，因为有些空格不一样

* part 目录中的图片的命名要是连续的，比如pic_001, pic_002, pic_003 ...(或者boot_001,boot_002,boot_003 ...)

* 打包成bootanimation.zip文件的时候，要要用zip格式的存储方式打包。

#### 3.4 将定制的bootanimation.zip放进Android系统


```
sudo mount system.img /mnt

sudo cp bootanimation.zip /mnt/media/

sudo chmod 777 /mnt/media/bootanimation.zip

sudo umount /mnt

```

最后重新将system.img烧写进Android设备，烧写成功后，重启Android设备即可看到定制的开机画面


#### 另一种方法


```
adb push bootanimation.zip /sdcard/bootanimation.zip
adb shell
su
// E9V3执行这条命令报错：mount: Operation not permitted，经实际测试E9V3不需要这条指令也可以
mount -o remount,rw /system( mount -o rw，remount /system)
cp /sdcard/bootanimation.zip /system/media/bootanimation.zip
cd /system/media/
chmod 777 bootanimation.zip（很重要）
```

## 四、参考资料
[Android启动画面分析](http://blog.csdn.net/luoshengyang/article/details/7691321/)
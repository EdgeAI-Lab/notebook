# Android屏幕适配

## 一、相关术语解释

1.1. 屏幕物理尺寸(inch)



1.2. 屏幕分辨率(px)



1.3. 屏幕像素密度（DPI）



1.4. dp(dip)
* As dp is a physical unit it has an absolute value which can be measured in traditional units, e.g. for Android devices 1 dp equals 1/160 of inch or 0.15875 mm.
* 屏幕物理尺寸一样，分辨率不一样时，好用
* 屏幕物理尺寸不同时，dp就不好用了

1.5. 手机截图图片的尺寸为什么和手机的物理尺寸不同？

* 显示器显示图片是按照图片的像素尺寸显示的




1.6. 
Density qualifier	Description
ldpi	Resources for low-density (ldpi) screens (~120dpi).
mdpi	Resources for medium-density (mdpi) screens (~160dpi). (This is the baseline density.)
hdpi	Resources for high-density (hdpi) screens (~240dpi).
xhdpi	Resources for extra-high-density (xhdpi) screens (~320dpi).
xxhdpi	Resources for extra-extra-high-density (xxhdpi) screens (~480dpi).
xxxhdpi	Resources for extra-extra-extra-high-density (xxxhdpi) uses (~640dpi).
nodpi	Resources for all densities. These are density-independent resources. The system does not scale resources tagged with this qualifier, regardless of the current screen's density.
tvdpi	Resources for screens somewhere between mdpi and hdpi; approximately 213dpi. This is not considered a "primary" density group. It is mostly intended for televisions and most apps shouldn't need it—providing mdpi and hdpi resources is sufficient for most apps and the system will scale them as appropriate. If you find it necessary to provide tvdpi resources, you should size them at a factor of 1.33*mdpi. For example, a 100px x 100px image for mdpi screens should be 133px x 133px for tvdpi.


Here's how other smallest width values correspond to typical screen sizes:

320dp: a typical phone screen (240x320 ldpi, 320x480 mdpi, 480x800 hdpi, etc).
480dp: a large phone screen ~5" (480x800 mdpi).
600dp: a 7” tablet (600x1024 mdpi).
720dp: a 10” tablet (720x1280 mdpi, 800x1280 mdpi, etc).


1.7. 
* 适配不同像素密度但物理尺寸相同的屏幕用dp
* 适配不同物理尺寸的屏幕用“备用布局文件”，“约束布局”，“.9图”


1.8. App ICON 
* 使用 Image Asset
* 在Android8.0及以上使用minmap-anydpi-v26中的图标，这里面是矢量图，能够自适应大多数屏幕；Android 8.0以下的系统，依旧使用minmap-xdpi文件夹中的资源
* 在Android7.0及以上使用drawable-anydpi-v24中的资源；Android7.0以下的系统使用drawable-xdpi文件夹中的资源



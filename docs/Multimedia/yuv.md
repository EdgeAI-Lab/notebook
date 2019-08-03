# 一文读懂YUV采样原理

## 1.颜色编码方式




## 2.YUV采样格式



[参考链接](https://blog.csdn.net/qq_39575835/article/details/86498161)

plannar 平面格式
先连续存储所有像素点的Y分量，然后存储所有的U分量，最后存储所有的V分量

packed 打包格式
每个像素点的Y、U、V分量是连续交替存储的
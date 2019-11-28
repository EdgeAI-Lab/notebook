# JZ2440开发

## 1.交叉编译工具链

百问网提供的交叉编译工具链是32位的，所以不能再64位Linux系统上运行，比如Ubuntu18.04。

解决方案：

```
# 安装32位的库
sudo apt-get install lib32ncurses5 lib32z1
```
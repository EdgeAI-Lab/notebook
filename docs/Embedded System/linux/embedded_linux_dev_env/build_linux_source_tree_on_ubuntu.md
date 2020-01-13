# Ubuntu构建内核源码树

## 1、列出可用的源码包
```shell
sudo apt-cache search linux-source
```
Ubuntu会支持好几个版本的Linux内核

## 2、安装Linux内核源码

```shell
sudo apt-get install xx-xx-xx
```

## 3.安装编译源码所需的依赖库
```
sudo apt-get install build-essential libncurses5-dev libssl-dev
```

编译报错的话，注意查看报错信息，少哪个依赖库就安装哪个

## 3.编译源码

```
#清除编译过程中产生的所有中间文件
sudo make mrproper

#清理上一次产生的编译中间文件
sudo make clean

#配置后生成.config文件
sudo make menuconfig

#编译源码
sudo make
```

## 安装内核模块

```
sudo make modules_install
```

## 安装内核

```
sudo make install
```

## 启用内核作为引导

一旦 make install 命令完成了，就是时候将内核启用来作为引导。使用这个命令来实现：
```
sudo update-initramfs -c -k 4.17-rc2
```

当然，你需要将上述内核版本号替换成你编译完的。当命令执行完毕后，使用如下命令来更新 grub：

```
sudo update-grub
```

现在你可以重启系统并且选择新安装的内核了。
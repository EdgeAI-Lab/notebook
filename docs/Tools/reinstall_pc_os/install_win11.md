# 安装 Windows11 系统

[点击查看 Windows 11安装官方说明](https://www.microsoft.com/zh-cn/software-download/windows11)

下面简单的补充几点实际安装过程中遇到的问题：

* 如果你的电脑本来就是Windows系统，那么最简单的方式就是使用Microsoft官方提供的安装工具来安装

* 如果你的电脑本身不是Windows系统（比如：Ubuntu），或者没有系统，那么首先需要将硬盘格式化为GPT格式，然后制作U盘安装盘

下面介绍下原系统非Windows系统时的安装说明。

## 1. 硬盘设置为GPT格式

使用命令行配置，进入命令行一般有两种方式(电脑本就有Windows系统的不算)：

* 从电脑BIOS系统中的修复系统功能进入，一般时开机按F8，具体可以根据电脑型号网上搜索
* 制作U盘启动盘，然后U盘启动，然后进入命令行

* 然后使用命令行工具 diskpart 进行操作，首先输入 diskpart 启动该工具 

```
diskpart
```

* 查看电脑中的硬盘

```
list disk
```

* 选择需要转换为GPT格式的

```
select disk n
```

* 清除该硬盘上的所有分区

```
clean
```

* 将该硬盘转换成 GPT格式

```
convert gpt
```

* 转换完成退出

```
exit
```

## 2. 制作U盘安装盘

* [在微软 Windows 11 下载官网](https://www.microsoft.com/zh-cn/software-download/windows11)，选择“下载 Windows 11 磁盘映像 (ISO)”

* 然后使用[Refus](http://rufus.ie/en/)制作U盘安装盘即可
# GCC编译动态链接库简介

## 1. 编写测试文件
* hello.c

```C
#include <stdio.h>
void print_hello(void)
{
    printf("Hello Linux!\n");
}

```

* test.c

```C
void print_hello(void);
int main()
{
    print_hello();
    return 0;
}

```

* 验证程序是否能被正确编译执行

```shell
gcc test.c hello.c -o test
./test
```

## 2.编译动态链接库并测试

* 将hello.c编译为动态链接库

```shell
gcc -fpic -shared hello.c -o libhello.so
```

> 注意：动态链接库的命名规则必须是libxxx.so，其中xxx是你的库名

|参数|含义|
|----|----|
|-fpic|指明编译为位置无关码|
|-shared|指明编译为动态链接库|


* 引用动态链接库libhello.so

```shell
# 首先将libhello.so添加到系统默认库搜索目录
sudo cp libhello.so /usr/lib/
# 或者
sudo cp libhello.so /lib/

# 编译test.c
gcc test.c -L. -lhello -o test

# 执行
./test
```
> 注意：test.c的位置必须在参数```-L. -lhello```之前

|参数|含义|
|----|----|
|-L.|告诉链接器要链接的库文件在当前目录下|
|-lhello|告诉链接器要链接的库的名字是libhello.so|

有时我们并不想使用系统默认的库搜索路径，那么指定添加自己的动态链接库路径，可以这么做：
```shell
# 打开文件
sudo vim /etc/ld.so.conf

# 然后在其末尾添加你的动态链接库路径，eg:
/home/pi/mydata

# 使配置生效
sudo ldconfig

```

## 3.查看库的引用情况

```shell
$ ldd test

linux-vdso.so.1 (0x0000007fa0ffb000)
libhello.so => /home/pi/mydata/libhello.so (0x0000007fa0f80000)
libc.so.6 => /lib/aarch64-linux-gnu/libc.so.6 (0x0000007fa0e27000)
/lib/ld-linux-aarch64.so.1 (0x0000007fa0fd0000)


```


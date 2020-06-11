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
# 编译test.c
gcc test.c -L. -lhello -o test

# 执行
./test
```
> 注意：test.c的位置必须在参数```-L. -lhello```之前

|参数|含义|
|----|----|
|-L.|库的搜索路径 - 告诉链接器要链接的库文件在当前目录下|
|-lhello|库的名字 - 告诉链接器要链接的库的名字是libhello.so|

* 执行测试文件

```shell
# 执行
./test
```

直接执行将会出现如下错误：

```shell
./test: error while loading shared libraries: libhello.so: cannot open shared object file: No such file or directory
```

意思是说在执行test程序的时候找不到其依赖的libhello.so库文件。

这是怎么回事呢？

Linux系统在执行程序的时候，首先会到系统默认的 /lib 和 /usr/lib 目录取寻找库文件；如果找不到就通过读取 /etc/ld.so.cache 文件获得其他的可搜索路径。

而 /etc/ld.so.cache 是 ldconfig 程序读取 /etc/ld.so.conf 文件生成的，所以我们把 libhello.so 所在的路径添加到 /etc/ld.so.conf 中，再以root权限运行 ldconfig 程序，更新 /etc/ld.so.cache ，运行时，就可以找到 libhello.so。

或者直接修改环境变量 LD_LIBRARY_PATH=. 告诉Linux系统执行test程序的时候，请在当前目录寻找依赖库。

综上所述，我们有3个解决方案：

```方案1：```

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

```方案2：```

```shell
# 打开文件
sudo vim /etc/ld.so.conf

# 然后在其末尾添加你的动态链接库路径，eg:
/path/to/your_lib_dir

# 使配置生效
sudo ldconfig

# 编译test.c
gcc test.c -L. -lhello -o test

# 执行
./test
```


```方案3```

```shell
LD_LIBRARY_PATH=. ./test
```



## 3.查看程序的依赖库

```shell
$ ldd test

linux-vdso.so.1 (0x0000007fa0ffb000)
libhello.so => /home/pi/mydata/libhello.so (0x0000007fa0f80000)
libc.so.6 => /lib/aarch64-linux-gnu/libc.so.6 (0x0000007fa0e27000)
/lib/ld-linux-aarch64.so.1 (0x0000007fa0fd0000)


```


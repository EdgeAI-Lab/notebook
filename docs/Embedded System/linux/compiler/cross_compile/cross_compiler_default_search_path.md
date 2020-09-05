# 交叉编译器头文件和库文件默认搜索路径

GCC编译器默认的头文件和库文件搜索路径与交叉编译器arm-linux-gcc的不一样

```
# arm-linux-gnueabi-gcc库文件搜索路径之一
/home/user_name/linux_driver/gcc-linaro-4.9.4/arm-linux-gnueabi/libc/usr/lib
```

使用如下命令可以查看到编译器默认的头文件和库文件的搜索路径的相关信息：

```
$ echo 'main(){}'|arm-linux-gnueabi-gcc -E -v -

Using built-in specs.
COLLECT_GCC=arm-linux-gnueabi-gcc
Target: arm-linux-gnueabi

...(此处省略n行打印信息)

#include "..." search starts here:
#include <...> search starts here:
 /home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/4.9.4/include
 /home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/4.9.4/include-fixed
 /home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/4.9.4/../../../../arm-linux-gnueabi/include
 /home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../arm-linux-gnueabi/libc/usr/include
End of search list.

...(此处省略n行打印信息)

main(){}
COMPILER_PATH=/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../libexec/gcc/arm-linux-gnueabi/4.9.4/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../libexec/gcc/arm-linux-gnueabi/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../libexec/gcc/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/4.9.4/../../../../arm-linux-gnueabi/bin/

LIBRARY_PATH=/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/4.9.4/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/4.9.4/../../../../arm-linux-gnueabi/lib/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../arm-linux-gnueabi/libc/lib/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../arm-linux-gnueabi/libc/usr/lib/

...(此处省略n行打印信息)

```

输出信息量非常大，我们重点关注以下的信息：

* 编译器头文件默认搜索路径

```
#include "..." search starts here:
#include <...> search starts here:
 /home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/4.9.4/include
 /home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/4.9.4/include-fixed
 /home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/4.9.4/../../../../arm-linux-gnueabi/include
 /home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../arm-linux-gnueabi/libc/usr/include
End of search list.
```

* 编译器库文件默认搜索路径

```
LIBRARY_PATH=/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/4.9.4/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/4.9.4/../../../../arm-linux-gnueabi/lib/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../arm-linux-gnueabi/libc/lib/:/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../arm-linux-gnueabi/libc/usr/lib/
```


下面通过一个实验来验证以上说法。

## 1.创建测试文件 add.c和add.h

* add.h
```c
int add(int a,int b);
```


* add.c
```c
int add(int a,int b)
{
    return a+b;
}
```

## 2.将add.c编译为动态链接库

```
arm-linux-gnueabi-gcc -fpic -shared add.c -o libadd.so
```

编译完成后将生成libadd.so文件，可以通过file命令查看其属性

```
$ file libadd.so 

libadd.so: ELF 32-bit LSB shared object, ARM, EABI5 version 1 (SYSV), dynamically linked, BuildID[sha1]=1d3a7de9679a9fd799c8eb81b59bbf2a1c5afb13, with debug_info, not stripped

```

## 3. 编写一个测试文件test.c

```c
#include <stdio.h>
#include "add.h"

int main()
{
    print("%d\n",add(3,5));
}
```

## 4. 编译测试文件

直接编译，将会看到找不到依赖文件libadd.c的报错信息：
```
$ arm-linux-gnueabi-gcc test.c -ladd -o test

arm-linux-gnueabi-gcc test.c -ladd -o test
/home/fhc/linux_driver/gcc-linaro-4.9.4/bin/../lib/gcc/arm-linux-gnueabi/4.9.4/../../../../arm-linux-gnueabi/bin/ld: cannot find -ladd
collect2: error: ld returned 1 exit status
```

那么怎么让编译器找到这个依赖文件呢？方法有二：


```方案1：```

通过编译器参数，将当前路径加入到编译器库文件搜索路径中：

```
arm-linux-gnueabi-gcc test.c -L . -ladd -o test
```

```方案2：```

将库文件复制到编译器默认的库文件搜索路径中：

```shell
# 首先将libadd.so添加到编译器默认库搜索目录
sudo cp libadd.so /xxx/lib/

# 编译test.c
arm-linux-gnueabi-gcc test.c -ladd -o test
```

细心的同学可能会问：add.h也没有在默认搜索路径中啊，怎么不报警告信息？

因为我们使用的是：
```
#include "add.h"
```
编译器会先在当前目录搜索是否有该头文件，然后才回去编译器默认定义的头文件路径中去搜索。




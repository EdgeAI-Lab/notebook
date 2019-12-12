# CMake交叉编译

## 1.创建测试文件hello.c

```c
#include<stdio.h>
int main()
{
	printf("Hello ARM CMake!\n");
	return 0;
}

```

## 2.创建CMakeList.txt文件

```cmake
cmake_minimum_required(VERSION 3.0.0)
project(hello_cmake VERSION 0.1.0)

add_executable(hello_cmake hello.c)
```

## 3.创建toolchain.cmake文件

该文件指明了交叉编译器信息

```
### toolchain.cmake ###
# this is required
SET(CMAKE_SYSTEM_NAME Linux)

# specify the cross compiler
SET(CMAKE_C_COMPILER   /home/fhc/linux_driver/gcc-3.4.5-glibc-2.3.6/bin/arm-linux-gcc)
SET(CMAKE_CXX_COMPILER /home/fhc/linux_driver/gcc-3.4.5-glibc-2.3.6/bin/arm-linux-g++)

# where is the target environment
SET(CMAKE_FIND_ROOT_PATH  /home/fhc/linux_driver/gcc-3.4.5-glibc-2.3.6)

# search for programs in the build host directories (not necessary)
SET(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)

# for libraries and headers in the target directories
SET(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
SET(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
```

## 4.执行CMake指令生成Makefile

有两种方式：

* camke-gui

![](../../..\assets\images\cmake\cross_compile_cmake_gui_00.png)

![](../../..\assets\images\cmake\cross_compile_cmake_gui_01.png)

![](../../..\assets\images\cmake\cross_compile_cmake_gui_02.png)

![](../../..\assets\images\cmake\cross_compile_cmake_gui_03.png)

![](../../..\assets\images\cmake\cross_compile_cmake_gui_04.png)


* 命令行

```
cmake -DCMAKE_TOOLCHAIN_FILE=../toolchain/toolchain.cmake ..
```

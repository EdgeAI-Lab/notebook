# cmake

首先确定你的开发环境中cmake的版本

```
cmake --version
```

为了更好的管理项目，以下示例将编译后产生的文件统一放到build目录。

## 1. 使用cmake编译单个c文件的项目

该项目项目目录结构如下所示：

```
.
├── build
├── CMakeLists.txt
└── test.c
```

CMakeLists.txt文件内容如下：

```cmake
cmake_minimum_required(VERSION 3.10.2)

# 设置项目名称和版本，并将项目名称赋值给PROJECT_NAME变量
project(hello_cmake VERSION 0.1.0)

add_executable(DO_IT test.c)
```

编译该项目（下文都将通过该方式编译项目，请知悉）：

```
$cd build
cmake ..
make
```

编译后项目的目录结构如下：

```
.
├── build
│   ├── CMakeCache.txt
│   ├── CMakeFiles
│   ├── cmake_install.cmake
│   ├── DO_IT
│   └── Makefile
├── CMakeLists.txt
└── test.c

```
DO_IT就是最终生成的可执行文件。

## 2. 使用cmake编译多个c文件的项目

通常一个C项目都会有多个源文件，本例中项目的目录结构如下：

```
.
├── build
├── CMakeLists.txt
├── inc
│   ├── addition.h
│   ├── division.h
│   ├── multiplication.h
│   └── subtraction.h
└── src
    ├── addition.c
    ├── division.c
    ├── multiplication.c
    ├── subtraction.c
    └── test.c
```

CMakeLists.txt文件内容如下：

```cmake
cmake_minimum_required(VERSION 3.10.2)

project(hello_cmake VERSION 0.1.0)

# 相当于GCC的 -I参数
include_directories(inc)

# 相当于 
# SRC = src/addition.c src/division.c src/multiplication.c src/subtraction.c src/test.c
aux_source_directory(src SRC)

add_executable(DO_IT ${SRC})

```

## 3. 安装可执行文件



## 3. 使用cmake编译多线程c程序

```cmake
cmake_minimum_required(VERSION 3.14.5)
project(hello_cmake VERSION 0.1.0)

find_package (Threads)
add_executable (myapp t.c)
target_link_libraries (myapp ${CMAKE_THREAD_LIBS_INIT})
```
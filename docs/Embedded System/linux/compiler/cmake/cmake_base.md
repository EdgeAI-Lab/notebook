# cmake

## 1. 使用cmake编译多线程c程序

```cmake
cmake_minimum_required(VERSION 3.14.5)
project(hello_cmake VERSION 0.1.0)

find_package (Threads)
add_executable (myapp t.c)
target_link_libraries (myapp ${CMAKE_THREAD_LIBS_INIT})
```
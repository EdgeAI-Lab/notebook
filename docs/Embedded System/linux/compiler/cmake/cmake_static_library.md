# CMake生成静态链接库

* 生成静态库

```cmake
cmake_minimum_required(VERSION 3.0.0)
project(LibTest VERSION 0.1.0)

add_library(staticLib STATIC myLib.c)
```

* 静态库测试
```camke
cmake_minimum_required(VERSION 3.0.0)
project(LibTest VERSION 0.1.0)

add_executable(LibTest test.c)
target_link_libraries(LibTest ${CMAKE_SOURCE_DIR}/build/libstaticLib.a)
```


* 生成动态库

```cmake
cmake_minimum_required(VERSION 3.0.0)
project(LibTest VERSION 0.1.0)

add_library(sharedLib SHARED myLib.c)
```


* 动态库测试
```camke
cmake_minimum_required(VERSION 3.0.0)
project(LibTest VERSION 0.1.0)

add_executable(LibTest test.c)
target_link_libraries(LibTest ${CMAKE_SOURCE_DIR}/build/libstaticLib.so)
```
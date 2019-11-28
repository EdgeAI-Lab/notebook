# CMake Usage

```
cmake_minimum_required(VERSION 3.0.0)
project(hello_cmake VERSION 0.1.0)

MESSAGE(STATUS ${CMAKE_SOURCE_DIR})

include_directories(${CMAKE_SOURCE_DIR})

add_executable(hello_cmake add.c main.cpp)

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
```
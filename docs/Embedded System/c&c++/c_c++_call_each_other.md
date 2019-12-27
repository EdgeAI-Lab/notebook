# C与C++相互调用

## 1.编译方式

gcc和g++都可以编译C文件和C++文件。

1. gcc会按照C的方式去编译C文件，会按照C++的方式去编译C++文件；

2. g++会按照C++的方式去编译C文件和C++文件。

验证以上说法：

```
gcc -c test.c

# 查看符号表
nm test.o
```

```
# gcc不会自动链接C++库，所以需要加上
gcc -c test.cpp

# 查看符号表
nm test.o
```

extern "C" 是g++才有的关键字。

## 2. C++调用C函数

```cpp
#ifdef _cplusplus

extern "C" {
    void printf();
}

#else


#endif

```

## 3. C调用C++函数

### 3.1 C调用C++普通函数


### 3.2 C调用C++重载函数

使用extern "C"是要告诉编译器按照C的方式来编译封装接口，接口里面的函数还是按照c++的语法和C++方式编译。

```
extern "C" int add_c(int a, int b){
    add(a,b);
}
```

### 3.3 C调用C++成员函数

# Android NDK开发

> 注意：Java通过JNI调用C/C++程序，其效率并不一定会提高，甚至会比纯java还低


## 1. 使用不带JNI接口的.so文件

不带JNI接口的.so文件，一般是直接由现有C/C++代码编译成的。在Android使用时需自己编写JNI层。

eg: add.c

```c
// add.c
int add(int a,int b)
{
  return a+b;
}
```
## 1.1 在Android Studio中将add.c编译为.so文件

* Android Studio中新建JNI工程，然后在CMakeList.txt文件中添加如下内容：
```camke
add_library( # Sets the name of the library.
        add

        # Sets the library as a shared library.
        SHARED

        # Provides a relative path to your source file(s).
        add.c)
```
在生成的apk文件中可以找到libadd.so文件

## 1.2 通过JNI接口调用libadd.so文件中的函数

* 在native-lib.cpp中添加如下内容：

```c++
#ifdef __cplusplus
extern "C"
#endif // __cplusplus
int add(int a,int b);

extern "C"
JNIEXPORT jint JNICALL
Java_com_fhc_ndktest_MainActivity_add(JNIEnv *env, jobject thiz, jint a, jint b) {
    return add(a,b);
}
```
在MainActivity.java中就可以使用了

## 2. 使用带JNI接口的.so文件

使用时要注意包名！！！



## 1. 使用现有的C/C++库

可以直接编译成.so（不带JNI接口）文件然后在Android Studio中引用，这种方法需要编写JNI接口，java层才能调用

java调用C/C++代码必须通过JNI接口





## 2. 使用自己写的C/C++程序






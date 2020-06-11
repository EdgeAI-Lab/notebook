# JNI Getting Start

## Reference Links

* [http://web.archive.org/web/20120419230023/http://java.sun.com/docs/books/jni/html/start.html](http://web.archive.org/web/20120419230023/http://java.sun.com/docs/books/jni/html/start.html)
* [https://zauner.nllk.net/post/0013-jni-and-the-java-library-path/](https://zauner.nllk.net/post/0013-jni-and-the-java-library-path/)

So, let's go!

## 1. Create a Java Class

```java
class HelloWorld {
     private native void print();
     public static void main(String[] args) {
         new HelloWorld().print();
     }
     static {
         System.loadLibrary("HelloWorld");
     }
 }
```

## 2. Comlile the Java Class

```shell
javac HelloWorld.java
```

## 3. Generate the head file of c program

```shell
javah -jni HelloWorld
```



## 4. Create the c program

```c
#include <jni.h>
#include <stdio.h>
#include "HelloWorld.h"

JNIEXPORT void JNICALL
Java_HelloWorld_print(JNIEnv *env, jobject obj)
{
     printf("Hello World!\n");
     return;
}

```

## 5. Compiler the c program into a shared library

* CMakeLists.txt

```camke
cmake_minimum_required(VERSION 3.10)

project(java_hello VERSION 1.0.1)

include_directories(/usr/lib/jvm/java-8-openjdk-amd64/include /usr/lib/jvm/java-8-openjdk-amd64/include/linux)

add_library(HelloWorld SHARED HelloWorld.c)
```

```shell
mkdir build && cd build
cmake ..
make
```

## 6. Run the Java Program

```shell
java -Djava.library.path=. HelloWorld
```
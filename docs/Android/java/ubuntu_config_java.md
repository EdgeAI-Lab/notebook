# Ubuntu中配置Java开发环境

## 1.安装Java

* OpenJDK

```bash
# 点击Tab键系统会列出所有可用版本的OpenJDK
$ sudo apt install openjdk[-Tab key-]
```


## 2.设置Java环境变量

* JAVA_HOME和JRE_HOME是约定俗成的，一些常用的软件库，会通过JAVA_HOME和JRE_HOME环境变量取获取java和jre的安装路径，其实你自己写的Java程序可以不用设置这两个环境变量。

* CLASSPATH是JVM用到的一个环境变量，它用来指示JVM如何搜索class。类似于C语言的头文件路径，是一个目录的集合。

```bash
$ vim /etc/profile

JAVA_HOME=
JRE_HOME=

CLASSPATH=
```

## 3.设置系统默认Java版本

```bash
$ update-alternatives --config java
```

## 4.查看已安装的jdk所在的目录

```shell
readlink -f /usr/bin/java
```






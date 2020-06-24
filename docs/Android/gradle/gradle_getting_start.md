# Gradle


## 1. 使用Gradle创建Java Application

[Building Java Applications](https://guides.gradle.org/building-java-applications/)

项目编译完成之后，会在 /build/distributions/ 目录下生成一个压缩文件，该压缩文件解压后，其目录结构如下：

```
your_project_name
├── bin
│   ├── os
│   └── os.bat
└── lib
    ├── checker-qual-2.11.1.jar
    ├── error_prone_annotations-2.3.4.jar
    ├── failureaccess-1.0.1.jar
    ├── guava-29.0-jre.jar
    ├── j2objc-annotations-1.3.jar
    ├── jsr305-3.0.2.jar
    ├── listenablefuture-9999.0-empty-to-avoid-conflict-with-guava.jar
    └── your_project_name.jar

```

设置JAVA_HOME

```
export JAVA_HOME=/path/to/jdk/
```

然后执行

```
./os
```

这个可以跨平台运行


## 2. 使用Gradle创建Java library

[Building Java Libraries](https://guides.gradle.org/building-java-libraries/)
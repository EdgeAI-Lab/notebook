# OpenCV for Android

## 1.下载并解压SDK
[OpenCVForAndroid SDK下载链接](https://opencv.org/releases/)

## 2. 新建一个Android Studio项目(opencv_test)
Menu -> "File" -> "New Project" -> "Empty Activity"

## 3.将OpenCV SDK导入opencv_test项目
Menu -> "File" -> "New" -> "Import Module"
Source directory: select this "sdk" directory
Module name: ":opencv"

## 4.在APP模块的build.gradle文件中添加Opencv依赖
```gradle

dependencies {
       implementation fileTree(dir: 'libs', include: ['*.jar'])
       ...
       implementation project(':opencv')
   }

```

## 5.Android Camera Preview示例测试
将OpenCV-android-sdk\samples\tutorial-1-camerapreview项目移植到APP中（复制MainActivity.java文件、layout文件，在AndroidManifest.xml添加访问摄像头的权限）






# 去掉Android USB设备权限请求对话框
!!! tip
	注意：还是需要申请USB设备访问权限的，只是不会弹出对话框了

1.1. 打开此文件

```
/android/frameworks/base/packages/SystemUI/src/com/android/systemui/usb/UsbPermissionActivity.java
```

1.2. 修改代码

* 找到这行代码，将其注释掉
```c
//setupAlert();

```

1.3. 添加以下代码（根据需求任选一个方案即可）

```c
/* 方案一：仅使自己的App不弹出对话框 */
if(!mPackageName.equals("com.fhc.usbcamera")){//双引号内为你要给权限的包名
    setupAlert();
}else {
    mPermissionGranted = true;
    finish();
}

/* 方案二：使所有的App不弹出对话框 */
mPermissionGranted = true;
finish();

```

参考资料：
[http://blog.csdn.net/hubbybob1/article/details/50263925](http://blog.csdn.net/hubbybob1/article/details/50263925)


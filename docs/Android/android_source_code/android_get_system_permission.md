# Android应用获取System权限的方法

## 1. 在Android系统源码中编译

* 在应用程序的AndroidManifest.xml中的manifest节点中加入如下属性：
```
android:sharedUserId="android.uid.system"
```

* 修改Android.mk文件（可参考源码中其他APP的Android.mk文件）

```makefile
LOCAL_PATH:= $(call my-dir)
include $(CLEAR_VARS)

LOCAL_MODULE_TAGS := optional

LOCAL_SRC_FILES := \
        $(call all-java-files-under, src)

LOCAL_RESOURCE_DIR := $(LOCAL_PATH)/res

LOCAL_PACKAGE_NAME := SetTime
LOCAL_CERTIFICATE := platform

include $(BUILD_PACKAGE)

include $(CLEAR_VARS)

# Use the following include to make our test apk.
include $(call all-makefiles-under,$(LOCAL_PATH))
```

* 使用mm命令来编译


## 2. 系统签名


在应用程序的AndroidManifest.xml中的manifest节点中加入如下属性：
```
android:sharedUserId="android.uid.system"
```

### 2.1 所需的工具
* signapk.jar (prebuilts/sdk/tools/lib/)
* platform.x509.pem  (build/target/product/security)
* platform.pk8  (build/target/product/security)


## 2.2 签名命令

```
java -jar signapk.jar platform.x509.pem platform.pk8 unsigned.apk signed.apk
```


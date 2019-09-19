# Android App开机自启之Launcher

1.1. 在AndroidManifest.xml文件中加入以下语句，使App成为Launcher

```html
<category android:name="android.intent.category.HOME" />
<category android:name="android.intent.category.DEFAULT" />	
```

1.2. 将系统默认Launcher删除

1.3. 将App（.apk文件）放进/system/app目录

1.4. 将App所使用的.so文件全部放进/system/lib目录

!!! note
    “/system/app” 目录下的应用都是系统已经预装完成的不会再次安装，所以不能把so打包到apk里面
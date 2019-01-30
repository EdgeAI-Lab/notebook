# 使Android系统默认开启USB调试功能
1.1. 默认显示 “开发者选项”

* 在packages/apps/Settings/src/com/android/settings/SettingsActivity.java文件的updateTilesList(...)函数中做如下修改：

```java
private void updateTilesList(List<DashboardCategory> target) {
        /* added by fhc 2017-11-24 */
        SharedPreferences.Editor editor=mDevelopmentPreferences.edit();
        editor.putBoolean(DevelopmentSettings.PREF_SHOW, true);
        editor.commit();
        /* added by fhc 2017-11-24 end */
        final boolean showDev = mDevelopmentPreferences.getBoolean(
                DevelopmentSettings.PREF_SHOW,
                android.os.Build.TYPE.equals("eng"));

        final UserManager um = (UserManager) getSystemService(Context.USER_SERVICE);
        
        ...（此处省略N行代码）
        
        }
```

1.2. 默认允许 “安装未知来源应用”

* 将frameworks/base/packages/SettingsProvider/res/values/defaults.xml文件中def_install_non_market_apps的值置为true，即可允许 “安装未知来源应用”。

```html
<bool name="def_install_non_market_apps">true</bool>
```

1.3. 默认允许USB调试

* 对frameworks/base/services/usb/java/com/android/server/usb/UsbDeviceManager.java的函数systemReady()做如下修改：

```java
 public void systemReady() {
        if (DEBUG) Slog.d(TAG, "systemReady");

        mNotificationManager = (NotificationManager)
                mContext.getSystemService(Context.NOTIFICATION_SERVICE);

        // We do not show the USB notification if the primary volume supports mass storage.
        // The legacy mass storage UI will be used instead.
        boolean massStorageSupported = false;
        final StorageManager storageManager = StorageManager.from(mContext);
        final StorageVolume primary = storageManager.getPrimaryVolume();
        massStorageSupported = primary != null && primary.allowMassStorage();
        mUseUsbNotification = !massStorageSupported && mContext.getResources().getBoolean(
                com.android.internal.R.bool.config_usbChargingMessage);

        // make sure the ADB_ENABLED setting value matches the current state
        try {
            /* modified by fhc 2017-11-28 */
            /*Settings.Global.putInt(mContentResolver,
                                Settings.Global.ADB_ENABLED, mAdbEnabled ? 1 : 0);*/
                                
            Settings.Global.putInt(mContentResolver,
                                Settings.Global.ADB_ENABLED, 1);
                                
            /* modified by fhc 2017-11-28 */
            } catch (SecurityException e) {
            // If UserManager.DISALLOW_DEBUGGING_FEATURES is on, that this setting can't be changed.
            Slog.d(TAG, "ADB_ENABLED is restricted.");
        }
        mHandler.sendEmptyMessage(MSG_SYSTEM_READY);
    }
```



1.4. 去掉USB插入时的授权提示对话框

* 对frameworks/base/packages/SystemUI/src/com/android/systemui/usb/UsbDebuggingActivity.java的onReceive()函数中做如下修改：

```java
@Override
public void onReceive(Context content, Intent intent) {
    String action = intent.getAction();
    if (!UsbManager.ACTION_USB_STATE.equals(action)) {
        return;
    }
    
    /* modified by fhc 2017-11-24 */
    /*boolean connected = intent.getBooleanExtra(UsbManager.USB_CONNECTED, false);
    if (!connected) {
        mActivity.finish();
    }*/
    /* modified by fhc 2017-11-24 end */
    
    /* added by fhc 2017-11-24 */
    boolean connected  = false;   //给connect赋值，关掉UI
    if (!connected) {
        mActivity.finish();
    }
    
    try {
        IBinder b = ServiceManager.getService(USB_SERVICE);    
        IUsbManager service = IUsbManager.Stub.asInterface(b);
        service.allowUsbDebugging(true, mKey);
    } catch (Exception e) {
        Log.e(TAG, "Unable to notify Usb service", e);
    }
    /* added by fhc 2017-11-24 end */
}         
```



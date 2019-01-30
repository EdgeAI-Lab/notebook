# Android App开机自启之监听开机广播
1.1. 创建广播接收器
```java
public class BootBroadcastReceive extends BroadcastReceiver {
    public static final String action_boot="android.intent.action.BOOT_COMPLETED";
    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent.getAction().equals(action_boot)){
            Intent bootIntent = new Intent(context,MainActivity.class);
            bootIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(bootIntent);
        }
    }
}
```

1.2. 在AndroidManifest.xml文件中注册广播接收器
```html
<receiver
	android:name=".BootBroadcastReceive"
	android:enabled="true"
	android:exported="true"
	android:permission="android.permission.RECEIVE_BOOT_COMPLETED">
	<intent-filter>
		<action android:name="android.intent.action.BOOT_COMPLETED" />
		<category android:name="android.intent.category.HOME" />
	</intent-filter>
</receiver>
```
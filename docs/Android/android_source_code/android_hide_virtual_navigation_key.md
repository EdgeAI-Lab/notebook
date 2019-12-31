# 彻底隐藏虚拟导航键

## 1. 去掉虚拟导航键

* 找到frameworks/base/services/core/java/com/android/server/policy/PhoneWindowManager.java中函数setInitialDisplaySize(...)中的代码片段

```java
String navBarOverride = SystemProperties.get("qemu.hw.mainkeys");
if ("1".equals(navBarOverride)) {
    mHasNavigationBar = false;
} else if ("0".equals(navBarOverride)) {
    mHasNavigationBar = true;
}
```
修改为

```java
String navBarOverride = SystemProperties.get("qemu.hw.mainkeys");
/* modified by fhc 2017-11-24 */
//if ("1".equals(navBarOverride)) {
    mHasNavigationBar = false;
//} else if ("0".equals(navBarOverride)) {
//    mHasNavigationBar = true;
//}
/* modified by fhc 2017-11-24 end */
```

## 2. 去掉系统顶部的状态栏和通知栏

* 屏蔽手势监听

frameworks/base/packages/SystemUI/src/com/android/systemui/statusbar/phone/PhoneStatusBarView.java
修改代码片段，如下所示：
```java
@Override
    public boolean onTouchEvent(MotionEvent event) {
        /* modified by fhc 2017-11-24 */
        /*boolean barConsumedEvent = mBar.interceptTouchEvent(event);

        if (DEBUG_GESTURES) {
            if (event.getActionMasked() != MotionEvent.ACTION_MOVE) {
                EventLog.writeEvent(EventLogTags.SYSUI_PANELBAR_TOUCH,
                        event.getActionMasked(), (int) event.getX(), (int) event.getY(),
                        barConsumedEvent ? 1 : 0);
            }
        }

        return barConsumedEvent || super.onTouchEvent(event);*/
        return false;
        /* modified by fhc 2017-11-24 end */
    }
    
    ...（此处省略N行代码）
    
    @Override
    public boolean onInterceptTouchEvent(MotionEvent event) {
        /* modified by fhc 2017-11-24 */
        //return mBar.interceptTouchEvent(event) || super.onInterceptTouchEvent(event);
        return false;
        /* modified by fhc 2017-11-24 end */
    }
    
```


* 不显示状态栏

frameworks/base/core/res/res/values/dimens.xml
将状态栏高度修改为0dp，如下所示：
```html
<!-- Height of the status bar -->
<dimen name="status_bar_height">0dp</dimen>
```
此时系统上方的状态不显示，但是需要将其布局也置为gone，不占地方 
在frameworks/base/packages/SystemUI/src/com/android/systemui/statusbar/phone/PhoneStatusBar.java文件中修改一下内容，将布局置为GONE 


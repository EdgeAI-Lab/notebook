# JavaFX学习笔记

一般来说Java并不适合做桌面应用，但是如果你只想用Java做GUI也是可以的，推荐使用JavaFX，AWT和Swing已经太古老了。

参考链接：

* IEDA官网的JavaFX教程


初学者注意事项：

* 建议使用JDK8，这样就可以直接使用JDK中自带的JavaFX（JavaFX从Java11开始已经从JDK中独立出来）
* 使用了JDK8，那么SceneBuilder也要使用对应于Java8的版本


## 在JavaFX中什么时候初始化空间呢？

实现Initializable接口，在initialize函数中初始化化你的控件。

```java
public class Controller implements Initializable {

    @Override
    public void initialize(URL location, ResourceBundle resources) {


    }
}
```

# JNI

Java通过JNI调用C/C++程序，其效率并不一定会提高，甚至会比纯java还低。

[Programming Languages Benchmarks](https://attractivechaos.github.io/plb/)

除了以下场景没有用JNI的必要：

* 为了iOS和Android平台的兼容性：OpenSSL等。
* 为了Hook Android Framework的Native部分。
* 遗留C、C++代码
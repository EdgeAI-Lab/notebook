# 字符集

## Unicode

Unicode provides a unique number for every character, no matter what the platform, program, or language is.

[更多信息请访问Unicode官网](https://home.unicode.org/basic-info/overview/)

Unicode为世界上的每一个字符提供唯一的二进制编码。但是并没有规定这些编码在互联网中的传输和存储方式。

所以随之出现了UTF-8, UTF-16,UTF-32等，针对Unicode字符集的编码方案，他们解决了Unicode字符在互联网中的传输和存储问题。

其中应用最多的就是UTF-8。

## UTF-8

UTF-8采用变长编码（1~4个字节）。

* UTF-8编码规则：

1. 对于单字节的符号，字节的第一位设为0，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。

2. 对于n字节的符号（n > 1），第一个字节的前n位都设为1，第n + 1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。


所以UTF-8编码方案**不需要考虑字节序**。


## UTF-8 BOM

相比于UTF-8，UTF-8 BOM


BOM即byte order mark，具体含义可百度百科或维基百科，UTF-8文件中放置BOM主要是微软的习惯，但是放在别的系统上会出现问题。

不含BOM的UTF-8才是标准形式，UTF-8不需要BOM

带BOM的UTF-8文件的开头会有U+FEFF，所以我新建的空文件会有3字节的大小。



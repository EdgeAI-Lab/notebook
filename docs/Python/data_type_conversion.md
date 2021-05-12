# Python数据类型转换

## 1.bytes与int互转

在二进制通信中，传输一个int类型的数据需要4个字节，python需要将这4个字节转换成int。我们可以通过 “位权” 来直接操作，但是python已经提供了相关的API不需要自己进行转换了。

* 使用 struct 软件包

[struct文档，其中有数据类型表](https://docs.python.org/3/library/struct.html)

```python
import struct

# 将一个数字变成字节数组，参数 "i"指的是 signed int 类型
# 将会把1转换成 b'\x01\x00\x00\x00'
struct.pack("i",1)

# 将一个字节数组转换成一个指signed int 类型的数字
bs=bytes([0x01,0x00,0x00,0x00])
struct.unpack("i",bs)
```


* 该方法适用于Python2和Python3

```python
import codecs

bytes=bytes([0x01,0x00,0x00,0x00])
# big end
print(int(codecs.encode(bytes, 'hex'), 16))
# little end
print(int(codecs.encode(bytes[::-1], 'hex'), 16))
```

```python
import struct

bytes=bytes([0x01,0x00,0x00,0x00])
print(struct.unpack("i",bytes))

```

* Python3有更好用的方法（Python2没有该功能）

```python
bytes=bytes([0x01,0x00,0x00,0x00])

print(int.from_bytes(bytes,"little"))
```

## 2.十六进制字符串转int

```python
# 这样转换得到的是无符号数
print(int("FF", 16))
print(int("0xFF", 16))

# 得到有符号数
print((0xFF+0x80)&0xFF)-0x80))
print((0xFFFF+0x8000)&0xFFFF)-0x8000))
```

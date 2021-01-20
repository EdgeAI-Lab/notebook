# Python tips

## 1.多线程

```python
import threading

def thread_a():
    print("it is thread a")

def thread_b():
    print("it is thread b")


threads = []

t1 = threading.Thread(target=thread_a)
threads.append(t1)
t2 = threading.Thread(target=thread_b)
threads.append(t2)
if __name__=='__main__':
    for t in threads:
        t.start()
    for t in threads:
        t.join()
print ("quit")
```

## 2.串口操作

* 安装 pyserial 库
```shell
pip install pyserial
```

* 设置并打开串口
```python
import serial

ser = serial.Serial("/dev/ttyS4",115200)
```

* 串口发送数据

```python
# 发送字符串
str = "serial"
ser.write(str.encode())

# 发送 bytes
data = [0x55,0xAA,0x5A]
ser.write(data)

# 发送数字
num = 100
ser.write(num.to_bytes(1,"little")) # 长度1，小端模式
```

* 串口接收数据

```python
# 读取一个 bytes
while read_is_running:
    bytes = ser.read()

# 读取一个字节
while read_is_running:
    byte = ser.read()[0]

# 读取一行
while read_is_running:
    byte = ser.readline()
```

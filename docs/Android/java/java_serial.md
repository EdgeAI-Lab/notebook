# java串口操作

[Java串口操作库](https://github.com/Fazecast/jSerialComm)



## 错误处理

报错信息：
```
The read operation timed out before any data was returned.
```

解决办法：
```
serialPort.setComPortTimeouts(SerialPort.TIMEOUT_READ_SEMI_BLOCKING, 0, 0);
```

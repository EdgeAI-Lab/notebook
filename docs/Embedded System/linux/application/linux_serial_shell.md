# 通过shell操作串口

* 查看串口参数

```shell
stty -F /dev/ttyS0 -a
```

* 设置串口参数

```shell
stty -F /dev/ttyS0 ispeed 115200 ospeed 115200 cs8
```

* 使用

```shell
#!/bin/bash

while :
do 
    echo -e "CMD0001 V002P0500T4000##\r" > /dev/ttyS1
    sleep 5
    echo -e "CMD0001 V002P2700T4000##\r" > /dev/ttyS1
    sleep 5
done
```

```shell
#!/bin/bash

while :
do 
    echo -e "CMD0001 GP002\r" > /dev/ttyS1
    sleep 0.1
done
```

* -e 使用转义字符
* echo默认会在末尾添加 \n
* 接收串口信息
```shell
cat /dev/ttyS1
```

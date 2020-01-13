# 编译器相关

1. 只编译不链接

```
gcc -c test.c

// 默认输出：
test.o
```

2. 查看目标映像文件(ELF文件)中的关键段信息（并没有将所有的段信息都打印出来）

```
objdump -h test.o

```
3. 将所有的段信息打印出来

```
readelf -S test.o
```


3. 查看ELF文件中各段的大小

```
size test.o
```

4. 将所有段的信息以16进制的形式打印出来

```
objdump -s test.o
```

5. 反汇编

```
objdump -d test.o
```

6. 读取ELF文件头信心

```
readelf -h test.o
```

7. 查看符号表

```
# 查看符号表
$ nm test.o
$ nm a.out

B 该符号在bss段
T 该符号在text段
U 该符号未定义

man nm

```
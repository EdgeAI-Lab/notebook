# ARM-Linux GDB远程调试

在PC机上运行GDB Client，在ARM板上运行GDB Server，通过网络通信，实现ARM-Linux GDB远程调试。

交叉编译工具链会提供GDB Client和GDB server这两个工具，当然也可以自己从源码编译。

* GDB Client是运行在PC上的软件程序

```bash
aarch64-none-linux-gnu/bin/aarch64-none-linux-gnu-gdb
```

```bash
$ file aarch64-none-linux-gnu-gdb
aarch64-none-linux-gnu-gdb: ELF 64-bit LSB executable, x86-64, version 1 (GNU/Linux), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=65909978691337613fd7e7540ee883c9138b0f13, not stripped
```

* GDB Server是运行在ARM板上的软件程序

```bash
aarch64-none-linux-gnu/aarch64-none-linux-gnu/libc/usr/bin/gdbserver
```

```bash
$ file gdbserver 
gdbserver: ELF 64-bit LSB executable, ARM aarch64, version 1 (GNU/Linux), dynamically linked, interpreter /lib/ld-linux-aarch64.so.1, for GNU/Linux 3.7.0, with debug_info, not stripped
```

## 1.编写测试程序

```c
#include <stdio.h>

int main()
{
    printf("Hello World!\n");
    printf("Hello ARM!\n");
    printf("Hello Linux!\n");
    return 0;
}
```

```shell
aarch64-none-linux-gnu-gcc test.c -o test -g
```

## 2.在命令行中调试

* 在ARM板中运行GDB Server

```shell
gdbserver 192.168.1.95:8989 test
```
其中 192.168.1.95 为运行GDB Client的PC机的IP地址，端口号可以随便写，test为要调试的elf文件。

* 在PC机中运行GDB Client连接GDB Server

```shell
$ aarch64-none-linux-gnu-gdb test
GNU gdb (GNU Toolchain for the A-profile Architecture 10.2-2020.11 (arm-10.16)) 10.1.90.20201028-git
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
Type "show copying" and "show warranty" for details.
This GDB was configured as "--host=x86_64-pc-linux-gnu --target=aarch64-none-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<https://bugs.linaro.org/>.
Find the GDB manual and other documentation resources online at:
    <http://www.gnu.org/software/gdb/documentation/>.

For help, type "help".
Type "apropos word" to search for commands related to "word"...
Reading symbols from a.out...
(gdb) 
```

GDB Client启动后，输入如下命令连接到GDB Server：

```shell
target remote 192.168.1.98:8989
```
其中192.168.1.98是ARM板的IP地址，8989为GDB Server设置的端口号。

成功后就可以进行调试了，跟使用GDB是一样的（可能无法使用run命令）。


## 3.在VSCode中调试

基于命令行的GDB调试不是很友好，我们可以利用VSCode中的调试模块来进行调试，原理跟命令行是一样的，只是增加了一个好用的GUI。

* 在ARM板中运行GDB Server

```shell
gdbserver 192.168.1.95:8989 test
```
其中 192.168.1.95 为运行GDB Client的PC机的IP地址，端口号可以随便写，test为要调试的elf文件。

* 配置VSCode - launch.json

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "gdbtest",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/test",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "miDebuggerPath": "/home/a/linux/packages/aarch64-none-linux-gnu/bin/aarch64-none-linux-gnu-gdb",
            "miDebuggerServerAddress": "192.168.1.98:8989",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ]
        }
    ]
}
```

可以先直接点击F5键，然后在生成的 launch.json 文件中 加入/修改 如下内容：

```json
# 名字可以随便写
"name": "gdbtest",

"program": "${workspaceFolder}/test",

"miDebuggerPath": "/home/a/linux/packages/aarch64-none-linux-gnu/bin/aarch64-none-linux-gnu-gdb",
"miDebuggerServerAddress": "192.168.1.98:8989",
```

配置完成后，按下F5键，就可以进入调试模式。

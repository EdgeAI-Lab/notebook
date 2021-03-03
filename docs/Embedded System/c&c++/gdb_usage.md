# GDB 使用

## 1.编译源代码

编译时要添加```-g```选项

```
$ gcc -g test.c
```
编译后生成a.out可执行文件

## 2.使用GDB进行调试

```
$ gdb a.out
```
* 进入GDB命令行交互界面后，可以使用help命令寻求帮助，直接执行help会列出GDB的命令分类

```
(gdb) help
List of classes of commands:

aliases -- Aliases of other commands.
breakpoints -- Making program stop at certain points.
data -- Examining data.
files -- Specifying and examining files.
internals -- Maintenance commands.
obscure -- Obscure features.
running -- Running the program.
stack -- Examining the stack.
status -- Status inquiries.
support -- Support facilities.
tracepoints -- Tracing of program execution without stopping the program.
user-defined -- User-defined commands.

Type "help" followed by a class name for a list of commands in that class.
Type "help all" for the list of all commands.
Type "help" followed by command name for full documentation.
Type "apropos word" to search for commands related to "word".
Type "apropos -v word" for full documentation of commands related to "word".
Command name abbreviations are allowed if unambiguous.

```

* help 分类名称，可以查看该分类下的单个命令

### 一般的调试步骤

* 使用 l 命令查看代码，l main查看main函数代码
* 设置断点 b line_number
* 运行程序 r ，因为我们先设置了断点，所以程序会在有断点的行停下来
* 然后可以选择单步执行 n ，也可以选择继续执行 c
* 调试过程中可以使用display var_name print var_name查看变量值



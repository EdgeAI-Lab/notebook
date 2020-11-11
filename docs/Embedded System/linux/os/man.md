# Linux中的man-pages项目

https://www.kernel.org/doc/man-pages/
https://blog.csdn.net/Wyx_wx/article/details/79507823
https://www.cyberciti.biz/faq/howto-use-linux-unix-man-pages/

man 是 manual（手册） 的简写，在命令行执行 "man ls" 既可以出现关于 "ls" 命令或数据的详细操作说明:
![]()


其实这些文档都来自与一个叫做man-pages的项目：
![]()


man-pages项目是一组文档，由一个个的man-page组成，主要用于描述Linux内核和C库（主要是glibc）的API接口函数，以及Linux命令。

一般一个man-page都会包含以下信息：

* 命令名称 + 一个简短的描述，用于简要说明该命令的主要作用
* 一个简要的命令使用方法
* 详细描述信息
* 其他信息

在man-pages项目中，这些man-page被分为8个章节（section）：

1: User commands; man-pages includes a very few Section 1 pages that document programs supplied by the GNU C library.
用户命令，比如ls cd pwd等

2: System calls documents the system calls provided by the Linux kernel.
系统调用API, 比如open(), write(), read()等

3: Library functions documents the functions provided by the standard C library.
标准C库函数，比如fopen(),fwrite(),fread()等

4: Devices documents details of various devices, most of which reside in /dev.
设备说明，这些设备一般位于/dev目录下，比如loop等

5: Files describes various file formats and filesystems, and includes proc(5), which documents the /proc file system.

7: Overviews, conventions, and miscellaneous.

8: Superuser and system administration commands; man-pages includes a very few Section 8 pages that document programs supplied by the GNU C library.


man-page左上角LS(1)

## man命令


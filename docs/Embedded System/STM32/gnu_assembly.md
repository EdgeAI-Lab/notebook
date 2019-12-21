# GNU汇编 for ARM

不同供应商的汇编工具，比如ARM汇编器和GNU汇编器具有不同的语法，多数情况下，助记符和汇编指令都是相同的，但是汇编伪指令、定义、标号和注释的语法可能会有差异。

[](https://sourceware.org/binutils/docs/as/)

[](https://sourceware.org/binutils/docs/as/Section.html)

[](https://ftp.gnu.org/old-gnu/Manuals/gas-2.9.1/html_chapter/as_7.html)

```
.section name[, "flags"[, @type]]
The optional flags argument is a quoted string which may contain any combintion of the following characters:

a
section is allocatable
w
section is writable
x
section is executable
The optional type argument may contain one of the following constants:

@progbits
section contains data
@nobits
section does not contain data (i.e., section only occupies space)
```
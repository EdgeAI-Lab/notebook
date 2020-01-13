# STM32启动过程-Keil

让我们从编译后说起。

## 1. ELF文件

在Keil中一个STM32项目被编译后，会生成一个ELF格式的.axf文件（在项目根目录下的Objects文件夹中），该文件中包含有数据段、代码段、调试段等各种信息，调试程序使用的就是ELF文件，ELF文件的格式如下：

![](../../assets\images\STM32\boot\elf_file_fromat.png)


## 2. BIN文件

但是最终通过JLink下载到STM32内部Flash的不是ELF文件而是BIN文件，BIN文件中是纯粹的指令代码和数据，没有其他冗余的数据。

将ELF文件中冗余的数据去掉，就是BIN文件的内容。如下图所示：

![](../../assets\images\STM32\boot\bin_file_content.png)

## 3. BSS段

BSS段(Block Started by Symbol)中存放的是初始值为零的全区和静态变量。

但是因为BSS段内容全为零，所以<font color=red>在ELF文件和BIN文件中均不包含BSS段的内容，只保存有BSS段的地址和大小信息</font>。

程序会在运行的时候根据BSS段地址和大小信息，在相应的内存空间中初始化BSS段。在Keil中这个任务是由ARM C库完成的。

## 4. 堆和栈

此处讨论的是STM32系统的堆和栈。

* 栈

栈是一块由系统专用的内存空间，在发生函数调用时存储函数的局部变量和参数，<font color=red>在Keil中栈的初始化是由ARM C库完成的。栈的操作由CPU自动完成</font>（C语言中的函数调用被编译为汇编时，就会有相应的出入栈操作指令）。

如下图所示，函数开始调用时会有入栈操作指令（当然函数调用结束时会有出栈操作）：

![](../../assets\images\STM32\boot\assembly_push_stack.png)

* 堆

堆是一块可以由程序员自由使用的内存空间，<font color=red>在Keil中堆的初始化和管理都是由ARM C库完成的</font>。堆的使用是程序员通过调用```malloc(),free()```等ARM C库函数完成的。


事实上，堆和栈都是一块预留的内存空间，在程序运行前其内容是没有意义的，所以<font color=red>在ELF文件和BIN文件中均没有堆和栈的内容，只有堆栈的地址和大小信息</font>。

STM32在上电启动时，ARM C库会根据BIN文件中堆栈的地址和大小信息，在相应的内存空间初始化堆和栈。


## 5. ELF文件视图，装载视图和运行视图

```
LR_IROM1 0x08000000 0x00010000  {
	
  ER_IROM1 0x08000000 0x00010000  {  ; load address = execution address
   *.o (RESET, +First)
   *(InRoot$$Sections)
   .ANY (+RO)
   .ANY (+XO)
  }

  RW_IRAM1 0x20000000 0x00005000  {
   .ANY (+RW +ZI)
  }
}
```

![](../../assets\images\STM32\boot\elf_load_run_view.png)

* ELF文件视图：STM32项目编译后，首先会生成ELF文件，ELF文件中包含大量的调试信息，这是程序真正运行时所不需要的。

* BIN文件视图：所以下载程序时，要先将ELF文件转换成BIN文件，然后再烧写到STM32的Flash中。

* 运行视图：STM32上电后，程序开始运行，首先会将Flash文件中的 .data段复制到SRAM中，并在SRAM中相应的位置初始化堆栈和.bss段。最好这些工作后跳转到用户的main函数，执行用户编写的业务逻辑。

ELF文件转BIN文件的方法：

```
# keil_installed_root/ARM/ARMCC/bin/fromelf.exe

fromelf.exe --bin --output test.bin test.axf
```

下载器与keil配合使用时，可以直接使用ELF文件烧写Flash，这是因为从ELF文件到BIN文件的过程是由Keil自动完成的。

### 5.1 装载（BIN文件）视图

最终烧写到STM32内部FLash中的内容如下图所示：

![](../../assets\images\STM32\boot\bin_view.png)

但是代码段(.text)中为什么会包含这些东西呢？

### 5.2 运行视图

设置STM32从FLASH启动，系统会将0x00地址映射到Flash的首地址0x08000000。

STM32上电后，

又根据《cortex-m3编程手册》，复位时，CPU从0x00000000处获取栈顶指针MSP（默认使用主堆栈），从0x00000004处获取程序计数器PC（复位向量）。则印证了上述说法。

--------------------------





STM32程序编译后生成的是ELF文件 -> bin文件（FLASH） -> 运行时

ELF文件格式


下载到Flash中的是bin文件（没有ELF头等多余的）

STM32上电后

## 1.启动代码的作用

2.ARM 汇编 语法简介

```
My_Fun PROC
    ADDS R0, R0, R1
    ENDP
```


3.启动代码分析


[SPACE](http://www.keil.com/support/man/docs/aa/aa_st_space.htm)
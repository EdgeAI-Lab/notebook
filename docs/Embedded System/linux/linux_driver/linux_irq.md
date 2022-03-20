# Linux中断处理

* Linux中不允许中断嵌套
* 在Linux内核的硬件里，可以设置软中断标志位，软中断标志位被设置后，软件中断并不会立即发生，软中断发生的时机：是在硬件中断处理的末尾，去调用一个专用线程去查询软中断向量表，然后执行被置位的软中断；在Linux内核的系统tick中断（该中断会不断的周期性产生一般是10ms）末尾也会去查询软中断向量表，然后执行被置位的软中断。
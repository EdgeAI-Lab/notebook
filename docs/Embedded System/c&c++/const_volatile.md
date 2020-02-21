# C语言const与volatile

## 1. const

声明一个只读变量。







## 2. volatile

告诉编译器不要去优化volatile修饰的代码，并且每次直接从数据源头读取数据，不允许将数据缓存到寄存器。


### 2.1 volatile的用途

* 寄存器访问（每次都直接从寄存器地址获取数据）


```c
// 对可读可写的寄存器使用volatile
// 防止编译器对多次操作该寄存器的代码进行优化
define GPIOB_ODR (*(volatile unsigned long *)0x40010C10UL)


// 对只读的寄存器使用volatile const
// 每次都直接从源地址读取数据，并且不允许对改地址进行写操作
define GPIOB_IDR (*(volatile const unsigned long *)0x40010C08UL)
```

* 
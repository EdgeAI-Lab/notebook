# C语言const与volatile

## 1. const

声明一个只读变量。








## 2. volatile

告诉编译器不要去优化volatile修饰的代码，并且每次直接从数据源头读取数据，不允许将数据缓存到寄存器。

<font color="red">注意：对volatile变量的操作不是原子性的。</font>

<font color="red">注意：volatile在c语言中和在java语言中的含义是不同的，本文重要阐述在c语言中的作用</font>


### 2.1 volatile的用途

#### 2.1.1 寄存器访问（每次都直接从寄存器地址获取数据）

<font color="red">访问寄存器必须使用volatile修饰符。</font>

1. 对可读可写的寄存器使用volatile，防止编译器对多次操作该寄存器的代码进行优化（一般是编译器开启了比较高的优化等级，才会执行这个代码优化）

```c
define GPIOB_ODR (*(volatile unsigned long *)0x40010C10UL)
```

example:

```c
GPIOB_ODR = 1;
GPIOB_ODR = 2;
GPIOB_ODR = 3;
```
如果不适用volatile修饰符，并且开启 O3 优化，则编译器可能会将上面的代码优化成：

```c
// 编译器会任务前面两个只是中间过程，所以会被优化掉
// 但是对寄存器的每一次操作都是有现实意义的
GPIOB_ODR = 3;
```

2. 对只读的寄存器使用volatile const，每次都直接从源地址读取数据，并且不允许对该地址进行写操作

```c
define GPIOB_IDR (*(volatile const unsigned long *)0x40010C08UL)
```

example：

```c
read_value = GPIOB_IDR;
print_to_screen(read_value);

read_value = GPIOB_IDR;
print_to_screen(read_value);

read_value = GPIOB_IDR;
print_to_screen(read_value);
```

同样的，如果不使用volatile修饰符，并且开启 O3 优化，则编译器可能会将上面的代码优化成：

```c
read_value = GPIOB_IDR;
print_to_screen(read_value);
```

以上实验，可以通过观察编译后的汇编代码验证。


#### 2.1.2 信号处理

比如下面的例子，本意是：主程序等待外部中断触发，然后将标志位变量```flag```置位，从而使得主程序得以继续运行。

```c
/* main.c */

// global variable
uint8_t flag = 0;

int main()
{
    while(!falg);

    // do something else

    return 0;
}

```

```c
// 中断处理函数

void Exception_IRQHandler(void)
{
    flag=1;
}
```

但是如果```flag```不使用volatile修饰符，并且编译器开启 O3 优化，那么程序将会被优化成：

```
  while (!flag);
 800020a:	4b05      	ldr	r3, [pc, #20]	; (8000220 <main+0x2c>)
 800020c:	781b      	ldrb	r3, [r3, #0]
 800020e:	b903      	cbnz	r3, 8000212 <main+0x1e>
 ; 一直在这里循环，而不会每次都去重新判断条件是否被满足
 8000210:	e7fe      	b.n	8000210 <main+0x1c>    
```

用C语言表示就相当于：

```c
int main()
{
    while(ture);

    return 0;
}

```

程序将永远无法继续向下运行，不管外部中断是否改变```flag```变量。

在STM32中，在进行串口发送的时候，通常会阻塞等待发送完毕：

```
USART_SendData(USART1, (uint8_t) cmd);

// 阻塞等待串口发送完毕
while (__HAL_UART_GET_FLAG(USART1, USART_FLAG_TXE) != SET){}	
```

```
#define     __IO    volatile             /*!< Defines 'read / write' permissions */

typedef struct
{
  __IO uint32_t SR;         /*!< USART Status register,                   Address offset: 0x00 */
  __IO uint32_t DR;         /*!< USART Data register,                     Address offset: 0x04 */
  __IO uint32_t BRR;        /*!< USART Baud rate register,                Address offset: 0x08 */
  __IO uint32_t CR1;        /*!< USART Control register 1,                Address offset: 0x0C */
  __IO uint32_t CR2;        /*!< USART Control register 2,                Address offset: 0x10 */
  __IO uint32_t CR3;        /*!< USART Control register 3,                Address offset: 0x14 */
  __IO uint32_t GTPR;       /*!< USART Guard time and prescaler register, Address offset: 0x18 */
} USART_TypeDef;


#define __HAL_UART_GET_FLAG(__HANDLE__, __FLAG__) (((__HANDLE__)->Instance->SR & (__FLAG__)) == (__FLAG__))
```

可以看到是经过```volatile```修饰的
# Free RTOS task switch

## 1. 调度器

任务调度器总是使就绪态的最高优先级的任务得到CPU运行权。

当有多个任务的优先级相同且是最高的优先级时，进行时间片轮转调度。


## 2. 任务切换的方式

FreeRTOS的任务切换是在 PendSV 中断中完成的，为什么要在 PendSV 中完成呢？

因为PendSV中断不是精确的，可以在高优先的中断中设置PendSV中断，并且PendSV中断不会立即执行，PendSV中断会等到高优先级的中断执行完之后再执行。


具体内容请参阅：《The Definitive Guide to
ARM Cortex-M3 and
Cortex-M4 Processors》第10.3节


* 通过调用API函数触发 PendSV 中断
```c

/* Scheduler utilities. */
#define portYIELD() 															\
{																				\
	/* Set a PendSV to request a context switch. */								\
	portNVIC_INT_CTRL_REG = portNVIC_PENDSVSET_BIT;								\
																				\
	/* Barriers are normally not required but do ensure the code is completely	\
	within the specified behaviour for the architecture. */						\
	__asm volatile( "dsb" ::: "memory" );										\
	__asm volatile( "isb" );													\
}

#define portYIELD_WITHIN_API portYIELD

#define taskYIELD_IF_USING_PREEMPTION() portYIELD_WITHIN_API()

#define portEND_SWITCHING_ISR( xSwitchRequired ) if( xSwitchRequired != pdFALSE ) portYIELD()
#define portYIELD_FROM_ISR( x ) portEND_SWITCHING_ISR( x )
```

## 3. 任务切换的时机

* Systick中断

* 间接或者直接调用portYIELD()触发PendSV中断

会调用portYIELD()的函数：

```c
osDelay();
osSingalSet();
...
```
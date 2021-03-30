## FreeRTOS任务栈 

### 1.任务栈的生长方向
FreeRTOS中用portSTACK_GROWTH来区分这两种生长方式，portSTACK_GROWTH大于0为向上生长，小于零为向下生长。

* 向上生长：入栈时栈顶指针增加，出栈时栈顶指针减小

* 向下生长：入栈时栈顶指针减小，出栈时栈顶指针增加

### 2.任务栈的大小

任务栈默认会被初始化为0xA5，这个被FreeRTOS用来检测任务栈的剩余大小，可以利用这个获取任务所需要的栈的尺寸。

* 任务栈内容初始化
```c
#define tskSTACK_FILL_BYTE	( 0xa5U )

xTaskCreateStatic() --> prvInitialiseNewTask() --> 
/* Fill the stack with a known value to assist debugging. */
( void ) memset( pxNewTCB->pxStack, ( int ) tskSTACK_FILL_BYTE, ( size_t ) ulStackDepth * sizeof( StackType_t ) );
```

* 获取任务栈剩余大小

```c
uxTaskGetStackHighWaterMark(TaskHandle_t xTask);
```

eg:
```
uint32_t fcnt=0;
fcnt=uxTaskGetStackHighWaterMark((TaskHandle_t)defaultTaskHandle);
```
假如你原先设置的任务栈是256 word，返回值fcnt是217 word，也就是说任务栈中有217 word都没有用到，只用到39 word，显然任务栈设置大了。


这个函数的检测原理是：从任务栈的起始地址开始，遍历寻找0xA5，找到一个0xA5就计一个数（ulCount++），0xA5的数量就是任务栈的剩余空间，具体可以阅读该函数的源码。

* 利用调试器（JLink或者STLink）和IDE来确定任务栈的大小

本文以STM32CubeIDE为例。

```c
CMSIS-RTOS2封装

osThreadId_t defaultTaskHandle;
uint32_t defaultTaskBuffer[ 256 ];
osStaticThreadDef_t defaultTaskControlBlock;
const osThreadAttr_t defaultTask_attributes = {
  .name = "defaultTask",
  .stack_mem = &defaultTaskBuffer[0],          // 栈内存
  .stack_size = sizeof(defaultTaskBuffer),
  .cb_mem = &defaultTaskControlBlock,          // 任务控制块
  .cb_size = sizeof(defaultTaskControlBlock),
  .priority = (osPriority_t) osPriorityNormal,
};
```
上面是CMSIS-RTOS2封装的任务结构体，其中cb_mem对应的就是任务控制块(tskTCB)，这两个结构体是一一对应的。


在调试模式下，打开实时变量观察器，可以看到任务栈顶指针的变化（理论上应该能够观察到栈顶指针的变化，但是实际测试发现IDE监测变化效果并不好，看不到栈顶指针的变化）。

![](../../../assets\images\STM32\FreeRTOS\freertos_stack.png)